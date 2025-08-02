'use client';

export default function Community() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            👥 RajniAI Community
          </h1>
          <p className="text-xl text-gray-300">
            Join thousands of users who trust RajniAI as their personal assistant
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="text-4xl font-bold text-white mb-2">10K+</div>
            <div className="text-gray-300">Active Users</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="text-4xl font-bold text-white mb-2">50K+</div>
            <div className="text-gray-300">Voice Interactions</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="text-4xl font-bold text-white mb-2">4.9★</div>
            <div className="text-gray-300">User Rating</div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div className="ml-3">
                  <div className="text-white font-semibold">Sarah M.</div>
                  <div className="text-gray-400 text-sm">Marketing Manager</div>
                </div>
              </div>
              <p className="text-gray-300">
                "RajniAI has transformed how I manage my daily tasks. The voice chat is incredibly natural, 
                and it remembers my preferences perfectly. Booking cabs and ordering food has never been easier!"
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  R
                </div>
                <div className="ml-3">
                  <div className="text-white font-semibold">Rajesh K.</div>
                  <div className="text-gray-400 text-sm">Software Engineer</div>
                </div>
              </div>
              <p className="text-gray-300">
                "As a busy professional, I love how RajniAI handles my calendar and scheduling. 
                The personalized recommendations for restaurants and travel options are spot on!"
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                  P
                </div>
                <div className="ml-3">
                  <div className="text-white font-semibold">Priya S.</div>
                  <div className="text-gray-400 text-sm">Student</div>
                </div>
              </div>
              <p className="text-gray-300">
                "RajniAI is like having a smart friend who knows exactly what I need. 
                The shopping recommendations are amazing, and it helps me stay within my budget!"
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-3">
                  <div className="text-white font-semibold">Amit P.</div>
                  <div className="text-gray-400 text-sm">Business Owner</div>
                </div>
              </div>
              <p className="text-gray-300">
                "The email drafting feature is incredible! RajniAI helps me communicate professionally 
                while saving me hours every week. It's become an essential part of my workflow."
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                  N
                </div>
                <div className="ml-3">
                  <div className="text-white font-semibold">Neha R.</div>
                  <div className="text-gray-400 text-sm">Travel Enthusiast</div>
                </div>
              </div>
              <p className="text-gray-300">
                "Planning trips with RajniAI is a breeze! It remembers my travel preferences 
                and suggests the best options. The voice interface makes it so convenient to use while traveling."
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  D
                </div>
                <div className="ml-3">
                  <div className="text-white font-semibold">David L.</div>
                  <div className="text-gray-400 text-sm">Freelancer</div>
                </div>
              </div>
              <p className="text-gray-300">
                "RajniAI's task management features help me stay organized and productive. 
                The AI personality adapts to my style, making interactions feel natural and personalized."
              </p>
            </div>
          </div>
        </div>

        {/* Community Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Join Our Community
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-4">💡</div>
              <h3 className="text-xl font-semibold text-white mb-3">Feature Requests</h3>
              <p className="text-gray-300 mb-4">
                Help shape the future of RajniAI by suggesting new features and improvements. 
                Your feedback drives our development roadmap.
              </p>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
                Submit Request
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-3">Beta Testing</h3>
              <p className="text-gray-300 mb-4">
                Get early access to new features and help us improve RajniAI by participating 
                in our beta testing program.
              </p>
              <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all">
                Join Beta
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-white mb-3">User Guides</h3>
              <p className="text-gray-300 mb-4">
                Access comprehensive guides, tutorials, and tips to get the most out of RajniAI. 
                Learn advanced features and shortcuts.
              </p>
              <button className="px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all">
                View Guides
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-white mb-3">Support Forum</h3>
              <p className="text-gray-300 mb-4">
                Connect with other users, share tips, and get help from our community. 
                Our support team is always ready to assist you.
              </p>
              <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all">
                Visit Forum
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Join the RajniAI Community?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/signup'}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Start Your Journey
            </button>
            <button
              onClick={() => window.location.href = '/voice-chat'}
              className="px-8 py-3 bg-white/10 text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all"
            >
              Try Now
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