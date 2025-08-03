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
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header Navigation */}
      {/* Spacer to offset global navbar height */}
      <div className="h-20" />

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

        {/* User-specific Action Buttons */}
        {user ? (
          <div className="flex justify-center gap-4 mb-16">
            <button
              onClick={() => window.location.href = '/voice-chat'}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              🎤 Start Voice Chat
            </button>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => window.location.href = '/preferences'}
              className="bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              ⚙️ Preferences
            </button>
          </div>
        ) : (
          <div className="flex justify-center gap-4 mb-16">
            <button
              onClick={() => window.location.href = '/signup'}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Sign Up
            </button>
            <button
              onClick={() => window.location.href = '/signin'}
              className="bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => window.location.href = '/forgot-password'}
              className="bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="text-4xl mb-4">🎤</div>
            <h3 className="text-xl font-semibold text-white mb-4">Voice First</h3>
            <p className="text-gray-300">
              Natural voice conversations with real-time transcription and AI responses
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold text-white mb-4">Smart Personalization</h3>
            <p className="text-gray-300">
              Learns your preferences for food, travel, shopping, and more
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-4">Task Management</h3>
            <p className="text-gray-300">
              Schedule meetings, set reminders, and manage your daily tasks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
