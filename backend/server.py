from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timedelta
from typing import List, Optional
import os
import json
import uuid
import base64
import hashlib
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from solana.rpc.async_api import AsyncClient
from solders.pubkey import Pubkey
from solders.keypair import Keypair
import base58

load_dotenv()

app = FastAPI(title="KingFace API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=json.loads(os.getenv("CORS_ORIGINS", '["http://localhost:3000"]')),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
client = AsyncIOMotorClient(os.getenv("MONGO_URL"))
db = client.kingface

# Solana connection
solana_client = AsyncClient(os.getenv("SOLANA_RPC_URL"))
security = HTTPBearer()

# Pydantic models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    wallet_address: str
    username: str
    display_name: str
    bio: str = ""
    avatar_url: str = ""
    tree_level: int = 1
    kft_balance: float = 0.0
    kftl_balance: float = 10.0  # Starting balance for testing
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Post(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    author_id: str
    author_username: str
    content: str
    content_type: str  # "text", "image", "video", "audio"
    media_url: str = ""
    media_hash: str = ""
    likes_count: int = 0
    comments_count: int = 0
    is_nft: bool = False
    nft_mint: str = ""
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Like(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    post_id: str
    user_id: str
    kftl_spent: float = 1.0
    created_at: datetime = Field(default_factory=datetime.utcnow)

class WalletConnect(BaseModel):
    wallet_address: str
    signature: str
    username: str
    display_name: str

class CreatePost(BaseModel):
    content: str
    content_type: str = "text"
    media_data: str = ""  # base64 encoded media

class LikePost(BaseModel):
    post_id: str

# Helper functions
async def verify_wallet_signature(wallet_address: str, signature: str, message: str = "KingFace Login") -> bool:
    """Verify wallet signature (simplified for demo)"""
    return True  # In production, implement proper signature verification

async def get_user_by_wallet(wallet_address: str) -> Optional[dict]:
    """Get user by wallet address"""
    user = await db.users.find_one({"wallet_address": wallet_address})
    return user

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """Get current user from JWT token"""
    token = credentials.credentials
    # Simplified JWT verification for demo
    try:
        # In production, properly verify JWT
        wallet_address = token  # Using wallet address as token for simplicity
        user = await get_user_by_wallet(wallet_address)
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

def calculate_ipfs_hash(data: bytes) -> str:
    """Calculate IPFS-like hash for content"""
    return hashlib.sha256(data).hexdigest()

# API Routes
@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.utcnow()}

@app.post("/api/auth/connect")
async def connect_wallet(wallet_data: WalletConnect):
    """Connect wallet and create/login user"""
    # Verify signature
    is_valid = await verify_wallet_signature(
        wallet_data.wallet_address, 
        wallet_data.signature
    )
    
    if not is_valid:
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    # Check if user exists
    existing_user = await get_user_by_wallet(wallet_data.wallet_address)
    
    if existing_user:
        # Update last login
        await db.users.update_one(
            {"wallet_address": wallet_data.wallet_address},
            {"$set": {"updated_at": datetime.utcnow()}}
        )
        user = existing_user
    else:
        # Create new user
        user_data = User(
            wallet_address=wallet_data.wallet_address,
            username=wallet_data.username,
            display_name=wallet_data.display_name
        )
        await db.users.insert_one(user_data.dict())
        user = user_data.dict()
    
    # Return token (simplified - using wallet address)
    return {
        "access_token": wallet_data.wallet_address,
        "token_type": "bearer",
        "user": user
    }

@app.get("/api/user/profile")
async def get_profile(current_user: dict = Depends(get_current_user)):
    """Get current user profile"""
    return current_user

@app.get("/api/users/{username}")
async def get_user_by_username(username: str):
    """Get user by username"""
    user = await db.users.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/api/posts")
async def create_post(post_data: CreatePost, current_user: dict = Depends(get_current_user)):
    """Create a new post"""
    # Handle media upload to IPFS (simplified)
    media_url = ""
    media_hash = ""
    
    if post_data.media_data:
        # In production, upload to IPFS
        media_hash = calculate_ipfs_hash(post_data.media_data.encode())
        media_url = f"{os.getenv('IPFS_GATEWAY')}{media_hash}"
    
    # Create post
    post = Post(
        author_id=current_user["id"],
        author_username=current_user["username"],
        content=post_data.content,
        content_type=post_data.content_type,
        media_url=media_url,
        media_hash=media_hash
    )
    
    # Save to database
    await db.posts.insert_one(post.dict())
    
    return post

@app.get("/api/posts/feed")
async def get_feed(skip: int = 0, limit: int = 20):
    """Get posts feed"""
    posts = await db.posts.find().sort("created_at", -1).skip(skip).limit(limit).to_list(length=limit)
    return posts

@app.get("/api/posts/{post_id}")
async def get_post(post_id: str):
    """Get specific post"""
    post = await db.posts.find_one({"id": post_id})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@app.post("/api/posts/like")
async def like_post(like_data: LikePost, current_user: dict = Depends(get_current_user)):
    """Like a post with KFTL tokens"""
    # Check if user has enough KFTL
    if current_user["kftl_balance"] < 1.0:
        raise HTTPException(status_code=400, detail="Insufficient KFTL balance")
    
    # Check if post exists
    post = await db.posts.find_one({"id": like_data.post_id})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Check if already liked
    existing_like = await db.likes.find_one({
        "post_id": like_data.post_id,
        "user_id": current_user["id"]
    })
    if existing_like:
        raise HTTPException(status_code=400, detail="Already liked this post")
    
    # Create like record
    like = Like(
        post_id=like_data.post_id,
        user_id=current_user["id"]
    )
    await db.likes.insert_one(like.dict())
    
    # Update post likes count
    await db.posts.update_one(
        {"id": like_data.post_id},
        {"$inc": {"likes_count": 1}}
    )
    
    # Update user KFTL balance (spend 1 KFTL)
    await db.users.update_one(
        {"id": current_user["id"]},
        {"$inc": {"kftl_balance": -1.0}}
    )
    
    # Update author balance (receive 0.9 KFTL, 0.1 goes to platform)
    await db.users.update_one(
        {"id": post["author_id"]},
        {"$inc": {"kftl_balance": 0.9}}
    )
    
    return {"message": "Post liked successfully", "kftl_spent": 1.0}

@app.get("/api/posts/{post_id}/likes")
async def get_post_likes(post_id: str):
    """Get likes for a specific post"""
    likes = await db.likes.find({"post_id": post_id}).to_list(length=None)
    return likes

@app.get("/api/users/{user_id}/posts")
async def get_user_posts(user_id: str, skip: int = 0, limit: int = 20):
    """Get posts by specific user"""
    posts = await db.posts.find({"author_id": user_id}).sort("created_at", -1).skip(skip).limit(limit).to_list(length=limit)
    return posts

@app.get("/api/stats")
async def get_platform_stats():
    """Get platform statistics"""
    users_count = await db.users.count_documents({})
    posts_count = await db.posts.count_documents({})
    likes_count = await db.likes.count_documents({})
    
    return {
        "users_count": users_count,
        "posts_count": posts_count,
        "likes_count": likes_count,
        "total_kftl_spent": likes_count * 1.0
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)