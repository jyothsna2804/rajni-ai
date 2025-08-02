'use client';

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            🚀 RajniAI Features
          </h1>
          <p className="text-xl text-gray-300">
            Discover what makes RajniAI your perfect personal assistant
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Voice Chat */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
            <div className="text-3xl mb-4">🎤</div>
            <h3 className="text-xl font-semibold text-white mb-3">Voice Chat</h3>
            <p className="text-gray-300">
              Natural voice conversations with real-time transcription and AI responses. 
              Just speak and RajniAI understands and responds instantly.
            </p>
          </div>

          {/* Personalization */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
            <div className="text-3xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold text-white mb-3">Smart Personalization</h3>
            <p className="text-gray-300">
              Learns your preferences for food, travel, shopping, and more. 
              Provides personalized recommendations and suggestions.
            </p>
          </div>

          {/* Task Management */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
            <div className="text-3xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-white mb-3">Task Management</h3>
            <p className="text-gray-300">
              Schedule meetings, set reminders, and manage your daily tasks. 
              RajniAI keeps you organized and on track.
            </p>
          </div>

          {/* Travel Assistant */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
            <div className="text-3xl mb-4">✈️</div>
            <h3 className="text-xl font-semibold text-white mb-3">Travel Assistant</h3>
            <p className="text-gray-300">
              Book cabs, flights, and hotels based on your preferences. 
              Get travel recommendations and manage bookings seamlessly.
            </p>
          </div>

          {/* Food & Dining */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
            <div className="text-3xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-white mb-3">Food & Dining</h3>
            <p className="text-gray-300">
              Order food from your favorite apps, find restaurants, and get 
              personalized dining recommendations based on your taste.
            </p>
          </div>

          {/* Shopping Assistant */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
            <div className="text-3xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-white mb-3">Shopping Assistant</h3>
            <p className="text-gray-300">
              Shop from your preferred e-commerce sites, track orders, and 
              get personalized product recommendations within your budget.
            </p>
          </div>

          {/* Communication */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-white mb-3">Communication</h3>
            <p className="text-gray-300">
              Draft emails, compose messages, and manage your communication. 
              RajniAI helps you express yourself clearly and professionally.
            </p>
          </div>

          {/* Calendar Management */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
            <div className="text-3xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-white mb-3">Calendar Management</h3>
            <p className="text-gray-300">
              Sync with your calendar app, schedule meetings, and manage 
              your time efficiently with smart scheduling suggestions.
            </p>
          </div>

          {/* AI Personality */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-white mb-3">Adaptive AI</h3>
            <p className="text-gray-300">
              Choose your preferred AI personality - friendly, casual, or professional. 
              RajniAI adapts to your communication style and preferences.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Experience RajniAI?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/signup'}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Get Started Free
            </button>
            <button
              onClick={() => window.location.href = '/voice-chat'}
              className="px-8 py-3 bg-white/10 text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all"
            >
              Try Voice Chat
            </button>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
} 