'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    preferences: null as any
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasPreferences, setHasPreferences] = useState(false);

  useEffect(() => {
    // Check if user has preferences saved
    const checkPreferences = async () => {
      try {
        // Get user data from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(prev => ({ ...prev, ...userData }));
          
          // Check preferences for this specific user
          const response = await fetch(`/api/user-preferences?userId=${userData.id}`);
          if (response.ok) {
            const data = await response.json();
            if (data && Object.keys(data).length > 3) { // More than just id, userId, timestamps
              setHasPreferences(true);
              setUser(prev => ({ ...prev, preferences: data }));
            }
          }
        }
      } catch (error) {
        console.log('No preferences found yet');
      }
      
      setIsLoading(false);
    };

    checkPreferences();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-emerald-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-white">🎯 RajniAI Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">Welcome back, {user.name}!</span>
                <button 
                  onClick={() => {
                    window.location.href = '/profile';
                  }}
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span>Profile</span>
                </button>
                <button 
                  onClick={() => {
                    // Clear any stored user data
                    localStorage.removeItem('user');
                    sessionStorage.removeItem('user');
                    // Show confirmation
                    if (confirm('Are you sure you want to sign out?')) {
                      // Redirect to home page
                      window.location.href = '/';
                    }
                  }}
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>🔓</span>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8 mb-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">🎉 Welcome to RajniAI!</h2>
              <p className="text-gray-300 text-lg mb-6">
                Your personal AI assistant is ready to help you with everything from booking cabs to managing your schedule.
              </p>
              {!hasPreferences ? (
                <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-4 mb-6">
                  <p className="text-emerald-300 mb-3">✨ Complete your profile to get personalized recommendations!</p>
                  <Link 
                    href="/preferences" 
                    className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    🎯 Set Preferences
                  </Link>
                </div>
              ) : (
                <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-4 mb-6">
                  <p className="text-emerald-300 mb-3">✅ Your profile is complete! RajniAI is personalized for you.</p>
                  <div className="text-sm text-gray-300 mb-3">
                    <p>📍 Home: {user.preferences?.homeLocation || 'Not set'}</p>
                    <p>🚗 Preferred Cab: {user.preferences?.cabServices?.join(', ') || 'Not set'}</p>
                    <p>🍽️ Cuisines: {user.preferences?.preferredCuisines?.join(', ') || 'Not set'}</p>
                  </div>
                  <Link 
                    href="/voice-chat" 
                    className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    🎤 Start Voice Chat
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link href="/voice-chat" className="group">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-400 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">🎤</div>
                <h3 className="text-xl font-semibold text-white mb-2">Voice Chat</h3>
                <p className="text-gray-300">Have a natural conversation with RajniAI</p>
              </div>
            </Link>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-white mb-2">Schedule Manager</h3>
              <p className="text-gray-300">Manage your calendar and appointments</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold text-white mb-2">Travel Assistant</h3>
              <p className="text-gray-300">Book cabs, flights, and hotels</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-white mb-2">Shopping Helper</h3>
              <p className="text-gray-300">Order groceries and essentials</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-semibold text-white mb-2">Email Assistant</h3>
              <p className="text-gray-300">Draft and manage emails</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Settings</h3>
              <p className="text-gray-300">Customize your preferences</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">📊 Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg">
                <div className="text-2xl">🎤</div>
                <div>
                  <p className="text-white font-medium">Voice chat session</p>
                  <p className="text-gray-400 text-sm">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg">
                <div className="text-2xl">🚗</div>
                <div>
                  <p className="text-white font-medium">Cab booking requested</p>
                  <p className="text-gray-400 text-sm">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg">
                <div className="text-2xl">📅</div>
                <div>
                  <p className="text-white font-medium">Calendar event added</p>
                  <p className="text-gray-400 text-sm">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 