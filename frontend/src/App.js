import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletContextProvider } from './contexts/WalletContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import CreatePost from './pages/CreatePost';
import './App.css';

// Import wallet CSS
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  return (
    <WalletContextProvider>
      <AuthProvider>
        <Router>
          <div className="App min-h-screen bg-king-darker text-white">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/profile/:username?" element={<Profile />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </WalletContextProvider>
  );
}

export default App;