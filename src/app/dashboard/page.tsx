'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [preferences, setPreferences] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Fetch user preferences
      fetch(`/api/user-preferences?userId=${parsedUser.id}`)
        .then(res => res.json())
        .then(data => {
          setPreferences(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      window.location.href = '/';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    window.location.href = '/signin';
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">R</span>
          </div>
          <h1 className="text-3xl font-bold text-white">RajniAI Dashboard</h1>
        </div>
        {/* Right side now empty – global navbar already includes actions */}
        <div />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-slate-800/50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            🎉 Welcome to RajniAI!
          </h2>
          <p className="text-gray-300 mb-6">
            Your personal AI assistant is ready to help you with everything from booking cabs to managing your schedule.
          </p>
          
          {preferences ? (
            <div className="bg-emerald-600/20 border border-emerald-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <span>✅</span>
                <span className="font-semibold">Your preferences are set up!</span>
              </div>
              <p className="text-emerald-300 text-sm">
                RajniAI is personalized for you and ready to assist.
              </p>
            </div>
          ) : (
            <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-yellow-400 mb-2">
                <span>⚠️</span>
                <span className="font-semibold">Complete your setup</span>
              </div>
              <p className="text-yellow-300 text-sm">
                Set up your preferences to get personalized assistance.
              </p>
            </div>
          )}
          
          <div className="mt-6">
            <button
              onClick={() => window.location.href = '/voice-chat'}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              <span>🎤</span>
              <span>Start Voice Chat</span>
            </button>
          </div>
        </div>

        {/* Preferences Summary (moved up) */}
        {preferences && (
          <div className="bg-slate-800/50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Your Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-400 mb-2">🏠 Home Location</h4>
                <p className="text-gray-300">{preferences.homeLocation || 'Not set'}</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-400 mb-2">🚗 Preferred Cab</h4>
                <p className="text-gray-300">{preferences.cabServices?.length ? preferences.cabServices.join(', ') : 'Not set'}</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-400 mb-2">🍽️ Cuisines</h4>
                <p className="text-gray-300">{preferences.preferredCuisines?.length ? preferences.preferredCuisines.join(', ') : 'Not set'}</p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => window.location.href = '/preferences'}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Preferences
              </button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <div className="text-4xl mb-4">🎤</div>
            <h3 className="text-xl font-semibold text-white mb-2">Voice Chat</h3>
            <p className="text-gray-300 mb-4">Have a natural conversation with RajniAI</p>
            <button
              onClick={() => window.location.href = '/voice-chat'}
              className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Start Chat
            </button>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-white mb-2">Schedule Manager</h3>
            <p className="text-gray-300 mb-4">Manage your calendar and appointments</p>
            <button
              onClick={() => window.location.href = '/preferences'}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Manage Schedule
            </button>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6">
            <div className="text-4xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold text-white mb-2">Travel Assistant</h3>
            <p className="text-gray-300 mb-4">Book cabs, flights, and hotels</p>
            <button
              onClick={() => window.location.href = '/voice-chat'}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Book Travel
            </button>
          </div>
        </div>

        {/* Preferences summary removed from bottom (relocated) */}
      </div>
    </div>
  );
} 