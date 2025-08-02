'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [hasPreferences, setHasPreferences] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Check if user has preferences
      if (parsedUser.id) {
        fetch(`/api/user-preferences?userId=${parsedUser.id}`)
          .then(res => {
            if (res.ok) {
              setHasPreferences(true);
            }
          })
          .catch(() => setHasPreferences(false));
      }
    }
  }, []);

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">RajniAI</div>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.href = '/features'}
              className="text-white hover:text-gray-300 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => window.location.href = '/community'}
              className="text-white hover:text-gray-300 transition-colors"
            >
              Community
            </button>
            {user ? (
              <button
                onClick={handleSignOut}
                className="text-white hover:text-gray-300 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  onClick={() => window.location.href = '/signin'}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => window.location.href = '/signup'}
                  className="px-4 py-2 bg-white text-purple-900 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {user ? (
          // Signed in user
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome back, {user.name || user.email}! 👋
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Your personal AI assistant is ready to help you
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <button
                onClick={() => window.location.href = '/voice-chat'}
                className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all text-white"
              >
                <div className="text-3xl mb-3">🎤</div>
                <h3 className="text-lg font-semibold mb-2">Start Voice Chat</h3>
                <p className="text-sm text-gray-300">Talk to RajniAI naturally</p>
              </button>
              
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all text-white"
              >
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-lg font-semibold mb-2">Dashboard</h3>
                <p className="text-sm text-gray-300">View your preferences</p>
              </button>
              
              <button
                onClick={() => window.location.href = '/profile'}
                className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all text-white"
              >
                <div className="text-3xl mb-3">⚙️</div>
                <h3 className="text-lg font-semibold mb-2">Profile</h3>
                <p className="text-sm text-gray-300">Edit your settings</p>
              </button>
              
              <button
                onClick={() => window.location.href = '/preferences'}
                className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all text-white"
              >
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-lg font-semibold mb-2">Preferences</h3>
                <p className="text-sm text-gray-300">Customize your experience</p>
              </button>
            </div>
          </div>
        ) : (
          // Guest user
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Meet RajniAI
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Your intelligent personal assistant that understands your preferences, 
              manages your tasks, and helps you live more efficiently through natural voice conversations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => window.location.href = '/signup'}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                Get Started Free
              </button>
              <button
                onClick={() => window.location.href = '/signin'}
                className="px-8 py-3 bg-white/10 text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all"
              >
                Sign In
              </button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-4">🎤</div>
                <h3 className="text-xl font-semibold text-white mb-3">Voice First</h3>
                <p className="text-gray-300">
                  Natural voice conversations with real-time transcription and AI responses
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-4">⚙️</div>
                <h3 className="text-xl font-semibold text-white mb-3">Smart Personalization</h3>
                <p className="text-gray-300">
                  Learns your preferences for food, travel, shopping, and more
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-white mb-3">Task Management</h3>
                <p className="text-gray-300">
                  Schedule meetings, set reminders, and manage your daily tasks
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
