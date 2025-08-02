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
    localStorage.removeItem('user');
    setUser(null);
    setHasPreferences(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      
      {/* Floating Dots */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <div className="text-2xl font-bold text-white">RajniAI</div>
        <div className="flex space-x-6 text-emerald-400">
          <a href="#features" className="hover:text-emerald-300 transition-colors">Features</a>
          <span className="text-gray-400">|</span>
          <a href="#pricing" className="hover:text-emerald-300 transition-colors">Pricing</a>
          <span className="text-gray-400">|</span>
          <a href="#privacy" className="hover:text-emerald-300 transition-colors">Privacy</a>
          <span className="text-gray-400">|</span>
          <a href="#faq" className="hover:text-emerald-300 transition-colors">FAQ</a>
          <span className="text-gray-400">|</span>
          <a href="#community" className="hover:text-emerald-300 transition-colors">Community</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="text-emerald-400">Your Personal AI.</span>
            <br />
            <span className="text-white">Always On.</span>
            <br />
            <span className="text-emerald-400">Always One Step Ahead.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            From booking cabs to planning weekends to replying to emails— <span className="text-emerald-400">RajniAI</span> handles your busy life, so you can live like a superstar.
          </p>

          {!user ? (
            // Not signed in - show Sign In/Sign Up buttons
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/signin" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10">🎯 Sign In</span>
              </a>
              <a 
                href="/signup" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-slate-700 to-slate-600 rounded-full border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10">👤 Sign Up</span>
              </a>
            </div>
          ) : (
            // Signed in - show multiple options
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="text-white mb-4">
                Welcome back, {user.name || user.email || 'User'}! 👋
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {hasPreferences ? (
                  <>
                    <a 
                      href="/voice-chat" 
                      className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="relative z-10">🎤 Start Voice Chat</span>
                    </a>
                    <a 
                      href="/dashboard" 
                      className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-full border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="relative z-10">📊 Dashboard</span>
                    </a>
                  </>
                ) : (
                  <a 
                    href="/profile" 
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="relative z-10">👤 Complete Profile</span>
                  </a>
                )}
                
                <a 
                  href="/profile" 
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-slate-700 to-slate-600 rounded-full border border-slate-500/30 hover:border-slate-400/50 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10">⚙️ Profile</span>
                </a>
                
                <button 
                  onClick={handleSignOut}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-500 rounded-full border border-red-500/30 hover:border-red-400/50 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10">🚪 Sign Out</span>
                </button>
              </div>
            </div>
          )}

          {/* Forgot Password Link */}
          {!user && (
            <div className="mt-6">
              <a 
                href="/forgot-password" 
                className="text-emerald-400 hover:text-emerald-300 transition-colors underline"
              >
                Forgot Password?
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Icons */}
      <div className="absolute bottom-6 left-6">
        <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">N</span>
        </div>
      </div>
      
      <div className="absolute bottom-6 right-6">
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xs">🧠</span>
        </div>
      </div>
    </div>
  );
}
