'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('user');
      setUser(null);
      window.location.href = '/';
    }
  };

  return (
    <nav className="flex justify-between items-center p-6 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900/90">
      {/* Brand */}
      <div
        onClick={() => (window.location.href = '/')}
        className="text-2xl font-bold text-white cursor-pointer select-none"
      >
        RajniAI
      </div>

      {/* Right-side Links */}
      <div className="flex items-center gap-6">
        {/* Static links */}
        <button
          onClick={() => (window.location.href = '/features')}
          className="text-white hover:text-gray-300 transition-colors"
        >
          Features
        </button>
        <button
          onClick={() => (window.location.href = '/community')}
          className="text-white hover:text-gray-300 transition-colors"
        >
          Community
        </button>
        <button
          onClick={() => (window.location.href = '/pricing')}
          className="text-white hover:text-gray-300 transition-colors"
        >
          Pricing
        </button>
        <button
          onClick={() => (window.location.href = '/faq')}
          className="text-white hover:text-gray-300 transition-colors"
        >
          FAQ
        </button>

        {/* Authenticated actions */}
        {user && (
          <>
            <button
              onClick={() => (window.location.href = '/profile')}
              className="text-white hover:text-gray-300 transition-colors"
            >
              Profile
            </button>
            <button
              onClick={handleSignOut}
              className="text-white hover:text-gray-300 transition-colors"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
} 