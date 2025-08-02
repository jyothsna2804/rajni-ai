'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    // Basic validation
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    if (!email || !password) {
      alert('Please fill in all fields!');
      setIsLoading(false);
      return;
    }

    // Simulate signup process
    setTimeout(() => {
      // Create new user data with consistent ID based on email
      const userData = {
        id: typeof email === 'string' ? `user-${email.replace(/[^a-zA-Z0-9]/g, '')}` : `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: typeof email === 'string' ? email.split('@')[0] : 'User',
        email: typeof email === 'string' ? email : 'user@example.com'
      };
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(userData));
      
      alert('Welcome to RajniAI! Let\'s set up your preferences to personalize your experience.');
      
      // Redirect to preferences for first-time setup
      window.location.href = '/preferences';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🚀 Join RajniAI</h1>
          <p className="text-gray-300">Create your account and start your AI-powered journey</p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                minLength={6}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Create a password"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                minLength={6}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Confirm your password"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 rounded border-white/20 bg-white/10 text-emerald-500 focus:ring-emerald-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-300">
                I agree to the{' '}
                <Link href="#" className="text-emerald-400 hover:text-emerald-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-emerald-400 hover:text-emerald-300">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-300">
              Already have an account?{' '}
              <Link href="/signin" className="text-emerald-400 hover:text-emerald-300 font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 text-center">
          <h3 className="text-white font-semibold mb-4">✨ What you'll get:</h3>
          <div className="grid grid-cols-1 gap-3 text-sm text-gray-300">
            <div className="flex items-center justify-center space-x-2">
              <span>🎯</span>
              <span>Personalized AI recommendations</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span>🎤</span>
              <span>Voice chat with RajniAI</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span>🚗</span>
              <span>Smart booking assistance</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span>📅</span>
              <span>Calendar and schedule management</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 