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
      sessionStorage.removeItem('user');
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-white">RajniAI</h1>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-gray-300">Welcome back, {user.name}! 👋</span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-6xl font-bold mb-6">
            <span className="text-emerald-400">Your Personal AI.</span><br />
            <span className="text-white">Always On.</span><br />
            <span className="text-emerald-400">Always One Step Ahead.</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            From booking cabs to planning weekends to replying to emails— 
            <span className="text-emerald-400 font-semibold"> RajniAI</span> handles your busy life, 
            so you can live like a superstar.
          </p>

          {user ? (
            /* Signed In User - Show Action Buttons */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <button
                onClick={() => window.location.href = '/voice-chat'}
                className="p-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors flex flex-col items-center gap-3"
              >
                <span className="text-3xl">🎤</span>
                <span className="font-semibold">Start Voice Chat</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="p-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex flex-col items-center gap-3"
              >
                <span className="text-3xl">📊</span>
                <span className="font-semibold">Dashboard</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/profile'}
                className="p-6 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-colors flex flex-col items-center gap-3"
              >
                <span className="text-3xl">⚙️</span>
                <span className="font-semibold">Profile</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/preferences'}
                className="p-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors flex flex-col items-center gap-3"
              >
                <span className="text-3xl">🎯</span>
                <span className="font-semibold">Preferences</span>
              </button>
            </div>
          ) : (
            /* Guest User - Show Auth Buttons */
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => window.location.href = '/signin'}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => window.location.href = '/signup'}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Sign Up
              </button>
              <a
                href="/forgot-password"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Forgot Password?
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
