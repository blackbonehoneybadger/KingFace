#!/usr/bin/env python3
"""
KingFace Backend API Comprehensive Test Suite
Tests all backend endpoints for MVP functionality
"""

import requests
import json
import time
import base64
from datetime import datetime
from typing import Dict, Any

# Configuration
BACKEND_URL = "http://localhost:8001"
API_BASE = f"{BACKEND_URL}/api"

class KingFaceAPITester:
    def __init__(self):
        self.session = requests.Session()
        self.test_user_token = None
        self.test_user_data = None
        self.test_post_id = None
        self.results = {
            "passed": 0,
            "failed": 0,
            "errors": []
        }
    
    def log_result(self, test_name: str, success: bool, message: str = ""):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        if message:
            print(f"   {message}")
        
        if success:
            self.results["passed"] += 1
        else:
            self.results["failed"] += 1
            self.results["errors"].append(f"{test_name}: {message}")
    
    def test_health_check(self):
        """Test /api/health endpoint"""
        print("\n=== Testing Health Check ===")
        try:
            response = self.session.get(f"{API_BASE}/health")
            
            if response.status_code == 200:
                data = response.json()
                if "status" in data and data["status"] == "healthy":
                    self.log_result("Health Check", True, f"Status: {data['status']}")
                else:
                    self.log_result("Health Check", False, f"Invalid response format: {data}")
            else:
                self.log_result("Health Check", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Health Check", False, f"Exception: {str(e)}")
    
    def test_wallet_connection(self):
        """Test /api/auth/connect endpoint"""
        print("\n=== Testing Wallet Connection ===")
        
        # Test data with realistic wallet address
        wallet_data = {
            "wallet_address": "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
            "signature": "test_signature_123",
            "username": "kingface_user",
            "display_name": "KingFace User"
        }
        
        try:
            response = self.session.post(
                f"{API_BASE}/auth/connect",
                json=wallet_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                if "access_token" in data and "user" in data:
                    self.test_user_token = data["access_token"]
                    self.test_user_data = data["user"]
                    self.log_result("Wallet Connection", True, f"Token received, User ID: {data['user']['id']}")
                else:
                    self.log_result("Wallet Connection", False, f"Invalid response format: {data}")
            else:
                self.log_result("Wallet Connection", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Wallet Connection", False, f"Exception: {str(e)}")
    
    def test_user_profile(self):
        """Test /api/user/profile endpoint"""
        print("\n=== Testing User Profile ===")
        
        if not self.test_user_token:
            self.log_result("User Profile", False, "No auth token available")
            return
        
        try:
            headers = {"Authorization": f"Bearer {self.test_user_token}"}
            response = self.session.get(f"{API_BASE}/user/profile", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and "username" in data and "wallet_address" in data:
                    self.log_result("User Profile", True, f"Profile retrieved for user: {data['username']}")
                else:
                    self.log_result("User Profile", False, f"Invalid profile format: {data}")
            else:
                self.log_result("User Profile", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("User Profile", False, f"Exception: {str(e)}")
    
    def test_get_user_by_username(self):
        """Test /api/users/{username} endpoint"""
        print("\n=== Testing Get User by Username ===")
        
        if not self.test_user_data:
            self.log_result("Get User by Username", False, "No test user data available")
            return
        
        try:
            username = self.test_user_data["username"]
            response = self.session.get(f"{API_BASE}/users/{username}")
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and "username" in data:
                    self.log_result("Get User by Username", True, f"User found: {data['username']}")
                else:
                    self.log_result("Get User by Username", False, f"Invalid user format: {data}")
            else:
                self.log_result("Get User by Username", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Get User by Username", False, f"Exception: {str(e)}")
    
    def test_create_text_post(self):
        """Test creating a text post"""
        print("\n=== Testing Create Text Post ===")
        
        if not self.test_user_token:
            self.log_result("Create Text Post", False, "No auth token available")
            return
        
        post_data = {
            "content": "This is a test post from KingFace API testing! 👑",
            "content_type": "text"
        }
        
        try:
            headers = {
                "Authorization": f"Bearer {self.test_user_token}",
                "Content-Type": "application/json"
            }
            response = self.session.post(f"{API_BASE}/posts", json=post_data, headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and "content" in data:
                    self.test_post_id = data["id"]
                    self.log_result("Create Text Post", True, f"Post created with ID: {data['id']}")
                else:
                    self.log_result("Create Text Post", False, f"Invalid post format: {data}")
            else:
                self.log_result("Create Text Post", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Create Text Post", False, f"Exception: {str(e)}")
    
    def test_create_image_post(self):
        """Test creating an image post with base64 data"""
        print("\n=== Testing Create Image Post ===")
        
        if not self.test_user_token:
            self.log_result("Create Image Post", False, "No auth token available")
            return
        
        # Create a simple base64 encoded test image data
        test_image_data = base64.b64encode(b"fake_image_data_for_testing").decode()
        
        post_data = {
            "content": "Check out this amazing image! 📸",
            "content_type": "image",
            "media_data": test_image_data
        }
        
        try:
            headers = {
                "Authorization": f"Bearer {self.test_user_token}",
                "Content-Type": "application/json"
            }
            response = self.session.post(f"{API_BASE}/posts", json=post_data, headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and "media_hash" in data:
                    self.log_result("Create Image Post", True, f"Image post created with hash: {data['media_hash'][:16]}...")
                else:
                    self.log_result("Create Image Post", False, f"Invalid image post format: {data}")
            else:
                self.log_result("Create Image Post", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Create Image Post", False, f"Exception: {str(e)}")
    
    def test_get_feed(self):
        """Test /api/posts/feed endpoint"""
        print("\n=== Testing Posts Feed ===")
        
        try:
            response = self.session.get(f"{API_BASE}/posts/feed")
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Posts Feed", True, f"Feed retrieved with {len(data)} posts")
                else:
                    self.log_result("Posts Feed", False, f"Invalid feed format: {type(data)}")
            else:
                self.log_result("Posts Feed", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Posts Feed", False, f"Exception: {str(e)}")
    
    def test_get_specific_post(self):
        """Test /api/posts/{post_id} endpoint"""
        print("\n=== Testing Get Specific Post ===")
        
        if not self.test_post_id:
            self.log_result("Get Specific Post", False, "No test post ID available")
            return
        
        try:
            response = self.session.get(f"{API_BASE}/posts/{self.test_post_id}")
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and "content" in data:
                    self.log_result("Get Specific Post", True, f"Post retrieved: {data['id']}")
                else:
                    self.log_result("Get Specific Post", False, f"Invalid post format: {data}")
            else:
                self.log_result("Get Specific Post", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Get Specific Post", False, f"Exception: {str(e)}")
    
    def test_like_system_success(self):
        """Test successful like with sufficient balance"""
        print("\n=== Testing Like System (Success) ===")
        
        if not self.test_user_token or not self.test_post_id:
            self.log_result("Like System Success", False, "Missing auth token or post ID")
            return
        
        like_data = {"post_id": self.test_post_id}
        
        try:
            headers = {
                "Authorization": f"Bearer {self.test_user_token}",
                "Content-Type": "application/json"
            }
            response = self.session.post(f"{API_BASE}/posts/like", json=like_data, headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "kftl_spent" in data:
                    self.log_result("Like System Success", True, f"Like successful, KFTL spent: {data['kftl_spent']}")
                else:
                    self.log_result("Like System Success", False, f"Invalid like response: {data}")
            else:
                self.log_result("Like System Success", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Like System Success", False, f"Exception: {str(e)}")
    
    def test_like_system_duplicate(self):
        """Test duplicate like prevention"""
        print("\n=== Testing Like System (Duplicate Prevention) ===")
        
        if not self.test_user_token or not self.test_post_id:
            self.log_result("Like System Duplicate", False, "Missing auth token or post ID")
            return
        
        like_data = {"post_id": self.test_post_id}
        
        try:
            headers = {
                "Authorization": f"Bearer {self.test_user_token}",
                "Content-Type": "application/json"
            }
            response = self.session.post(f"{API_BASE}/posts/like", json=like_data, headers=headers)
            
            if response.status_code == 400:
                data = response.json()
                if "Already liked" in data.get("detail", ""):
                    self.log_result("Like System Duplicate", True, "Duplicate like properly prevented")
                else:
                    self.log_result("Like System Duplicate", False, f"Wrong error message: {data}")
            else:
                self.log_result("Like System Duplicate", False, f"Expected 400, got {response.status_code}")
                
        except Exception as e:
            self.log_result("Like System Duplicate", False, f"Exception: {str(e)}")
    
    def test_platform_stats(self):
        """Test /api/stats endpoint"""
        print("\n=== Testing Platform Statistics ===")
        
        try:
            response = self.session.get(f"{API_BASE}/stats")
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["users_count", "posts_count", "likes_count", "total_kftl_spent"]
                if all(field in data for field in required_fields):
                    self.log_result("Platform Stats", True, 
                        f"Stats: {data['users_count']} users, {data['posts_count']} posts, {data['likes_count']} likes")
                else:
                    self.log_result("Platform Stats", False, f"Missing required fields: {data}")
            else:
                self.log_result("Platform Stats", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Platform Stats", False, f"Exception: {str(e)}")
    
    def test_insufficient_balance_scenario(self):
        """Test like system with insufficient balance"""
        print("\n=== Testing Insufficient Balance Scenario ===")
        
        # Create a new user with 0 balance for this test
        wallet_data = {
            "wallet_address": "5WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWX",
            "signature": "test_signature_456",
            "username": "poor_user",
            "display_name": "Poor User"
        }
        
        try:
            # Create user
            response = self.session.post(f"{API_BASE}/auth/connect", json=wallet_data)
            if response.status_code != 200:
                self.log_result("Insufficient Balance Test", False, "Failed to create test user")
                return
            
            poor_user_token = response.json()["access_token"]
            
            # Try to like with insufficient balance (need to drain balance first)
            # The user starts with 10.0 KFTL, so we need to spend it all
            headers = {"Authorization": f"Bearer {poor_user_token}", "Content-Type": "application/json"}
            
            # Create a post to like
            post_data = {"content": "Test post for balance check", "content_type": "text"}
            post_response = self.session.post(f"{API_BASE}/posts", json=post_data, headers=headers)
            
            if post_response.status_code == 200:
                test_post_id = post_response.json()["id"]
                
                # Like the post 10 times to drain balance (10 KFTL starting balance)
                for i in range(10):
                    like_data = {"post_id": test_post_id}
                    self.session.post(f"{API_BASE}/posts/like", json=like_data, headers=headers)
                
                # Now try to like again with insufficient balance
                like_response = self.session.post(f"{API_BASE}/posts/like", json=like_data, headers=headers)
                
                if like_response.status_code == 400:
                    data = like_response.json()
                    if "Insufficient KFTL balance" in data.get("detail", ""):
                        self.log_result("Insufficient Balance Test", True, "Balance check working correctly")
                    else:
                        self.log_result("Insufficient Balance Test", False, f"Wrong error message: {data}")
                else:
                    self.log_result("Insufficient Balance Test", False, f"Expected 400, got {like_response.status_code}")
            else:
                self.log_result("Insufficient Balance Test", False, "Failed to create test post")
                
        except Exception as e:
            self.log_result("Insufficient Balance Test", False, f"Exception: {str(e)}")
    
    def test_error_handling(self):
        """Test various error scenarios"""
        print("\n=== Testing Error Handling ===")
        
        # Test invalid post ID
        try:
            response = self.session.get(f"{API_BASE}/posts/invalid-post-id")
            if response.status_code == 404:
                self.log_result("Error Handling - Invalid Post", True, "404 returned for invalid post ID")
            else:
                self.log_result("Error Handling - Invalid Post", False, f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_result("Error Handling - Invalid Post", False, f"Exception: {str(e)}")
        
        # Test invalid username
        try:
            response = self.session.get(f"{API_BASE}/users/nonexistent-user")
            if response.status_code == 404:
                self.log_result("Error Handling - Invalid User", True, "404 returned for invalid username")
            else:
                self.log_result("Error Handling - Invalid User", False, f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_result("Error Handling - Invalid User", False, f"Exception: {str(e)}")
        
        # Test unauthorized access
        try:
            response = self.session.get(f"{API_BASE}/user/profile")
            if response.status_code == 403:
                self.log_result("Error Handling - Unauthorized", True, "403 returned for unauthorized access")
            else:
                self.log_result("Error Handling - Unauthorized", False, f"Expected 403, got {response.status_code}")
        except Exception as e:
            self.log_result("Error Handling - Unauthorized", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all tests in sequence"""
        print("🚀 Starting KingFace Backend API Comprehensive Tests")
        print(f"Backend URL: {BACKEND_URL}")
        print("=" * 60)
        
        # Core functionality tests
        self.test_health_check()
        self.test_wallet_connection()
        self.test_user_profile()
        self.test_get_user_by_username()
        
        # Post management tests
        self.test_create_text_post()
        self.test_create_image_post()
        self.test_get_feed()
        self.test_get_specific_post()
        
        # Like system tests
        self.test_like_system_success()
        self.test_like_system_duplicate()
        self.test_insufficient_balance_scenario()
        
        # Statistics and error handling
        self.test_platform_stats()
        self.test_error_handling()
        
        # Print summary
        print("\n" + "=" * 60)
        print("🏁 TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Passed: {self.results['passed']}")
        print(f"❌ Failed: {self.results['failed']}")
        print(f"📊 Total: {self.results['passed'] + self.results['failed']}")
        
        if self.results['errors']:
            print("\n🚨 FAILED TESTS:")
            for error in self.results['errors']:
                print(f"   • {error}")
        
        success_rate = (self.results['passed'] / (self.results['passed'] + self.results['failed'])) * 100
        print(f"\n📈 Success Rate: {success_rate:.1f}%")
        
        if success_rate >= 80:
            print("🎉 Backend API is working well!")
        elif success_rate >= 60:
            print("⚠️  Backend API has some issues but core functionality works")
        else:
            print("🚨 Backend API has significant issues that need attention")
        
        return self.results

if __name__ == "__main__":
    tester = KingFaceAPITester()
    results = tester.run_all_tests()