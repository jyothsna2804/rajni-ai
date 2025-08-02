'use client';

export default function SignIn() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300">Sign in to your RajniAI account</p>
        </div>

        {/* Sign In Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8">
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const data = {
              email: formData.get('email'),
              password: formData.get('password'),
              remember: formData.get('remember')
            };
            
            // Show success message
            alert('Welcome back! You have successfully signed in to RajniAI!');
            
            // Create user data with consistent ID based on email
            const userData = {
              id: typeof data.email === 'string' ? `user-${data.email.replace(/[^a-zA-Z0-9]/g, '')}` : `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              name: typeof data.email === 'string' ? data.email.split('@')[0] : 'User',
              email: typeof data.email === 'string' ? data.email : 'user@example.com'
            };
            localStorage.setItem('user', JSON.stringify(userData));
            
            // Check if user has preferences - if not, redirect to profile first
            fetch(`/api/user-preferences?userId=${userData.id}`)
              .then(response => {
                if (response.status === 404) {
                  // New user - redirect to profile first
                  window.location.href = '/profile';
                } else {
                  // Existing user - redirect directly to voice chat
                  window.location.href = '/voice-chat';
                }
              })
              .catch(() => {
                // Error - assume new user, redirect to profile
                window.location.href = '/profile';
              });
          }}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="h-4 w-4 text-emerald-500 border-emerald-500/30 rounded focus:ring-emerald-400 focus:ring-2"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-emerald-400 hover:text-emerald-300 underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full group relative inline-flex items-center justify-center px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 hover:from-emerald-400 hover:to-cyan-400"
            >
              <span className="relative z-10">🔐 Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Social Sign In */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center px-4 py-3 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-white hover:border-emerald-400 transition-colors">
              <span className="mr-3">📧</span>
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center px-4 py-3 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-white hover:border-emerald-400 transition-colors">
              <span className="mr-3">📱</span>
              Continue with Apple
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Don't have an account?{" "}
              <a href="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium">
                Sign Up
              </a>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <a href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 