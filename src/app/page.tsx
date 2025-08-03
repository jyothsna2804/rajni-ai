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
      setUser(null);
      setHasPreferences(false);
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold text-white">
          RajniAI
        </div>
        <div className="flex items-center space-x-6">
          <button
            onClick={() => window.location.href = '/features'}
            className="text-white hover:text-purple-300 transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => window.location.href = '/community'}
            className="text-white hover:text-purple-300 transition-colors"
          >
            Community
          </button>
          <button
            onClick={() => alert('Pricing coming soon!')}
            className="text-white hover:text-purple-300 transition-colors"
          >
            Pricing
          </button>
          <button
            onClick={() => alert('FAQ coming soon!')}
            className="text-white hover:text-purple-300 transition-colors"
          >
            FAQ
          </button>
          {user ? (
            <>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="text-white hover:text-purple-300 transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => window.location.href = '/signin'}
                className="text-white hover:text-purple-300 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => window.location.href = '/signup'}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Meet RajniAI
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Your intelligent personal assistant that understands your preferences,
          manages your tasks, and helps you live more efficiently through natural
          voice conversations.
        </p>

        {/* Action Buttons */}
        {user ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <h2 className="text-2xl text-white mb-4">Welcome back, {user.name}! 👋</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/voice-chat'}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                🎤 Start Voice Chat
              </button>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                📊 Dashboard
              </button>
              <button
                onClick={() => window.location.href = '/profile'}
                className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
              >
                ⚙️ Profile
              </button>
              <button
                onClick={() => window.location.href = '/preferences'}
                className="bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                🎯 Preferences
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => window.location.href = '/signin'}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => window.location.href = '/signup'}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
            <button
              onClick={() => window.location.href = '/forgot-password'}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-4xl mb-4">🎙️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Voice First</h3>
            <p className="text-gray-300">
              Natural voice conversations with real-time transcription and AI responses
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Personalization</h3>
            <p className="text-gray-300">
              Learns your preferences for food, travel, shopping, and more
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-2">Task Management</h3>
            <p className="text-gray-300">
              Schedule meetings, set reminders, and manage your daily tasks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
