'use client';

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-gray-300">Enter your email to receive a reset link</p>
        </div>

        {/* Forgot Password Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8">
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const email = formData.get('email');
            
            // Show success message
            alert(`Password reset link sent to ${email}! Please check your email.`);
            
            // Redirect back to sign in
            window.location.href = '/signin';
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full group relative inline-flex items-center justify-center px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 hover:from-emerald-400 hover:to-cyan-400"
            >
              <span className="relative z-10">📧 Send Reset Link</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Back to Sign In */}
          <div className="mt-6 text-center">
            <a href="/signin" className="text-emerald-400 hover:text-emerald-300 font-medium">
              ← Back to Sign In
            </a>
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