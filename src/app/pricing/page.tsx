'use client';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <button
            onClick={() => window.location.href = '/'}
            className="mb-6 text-white hover:text-gray-300 transition-colors"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl font-bold text-white mb-4">
            💰 RajniAI Pricing
          </h1>
          <p className="text-xl text-gray-300">
            Choose the perfect plan for your personal AI assistant needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Free Plan */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-white mb-2">Free</h3>
              <div className="text-4xl font-bold text-white mb-2">₹0</div>
              <p className="text-gray-300">per month</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-300">
                <span className="text-green-400 mr-2">✓</span>
                Basic voice chat (10 messages/day)
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-green-400 mr-2">✓</span>
                Basic preferences setup
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-green-400 mr-2">✓</span>
                Email support
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-red-400 mr-2">✗</span>
                Advanced AI personality
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-red-400 mr-2">✗</span>
                Priority support
              </li>
            </ul>
            
            <button
              onClick={() => window.location.href = '/signup'}
              className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Get Started Free
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 border-2 border-purple-400 relative hover:scale-105 transition-transform">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-white mb-2">Pro</h3>
              <div className="text-4xl font-bold text-white mb-2">₹499</div>
              <p className="text-gray-200">per month</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-white">
                <span className="text-green-400 mr-2">✓</span>
                Unlimited voice chat
              </li>
              <li className="flex items-center text-white">
                <span className="text-green-400 mr-2">✓</span>
                Advanced preferences & personalization
              </li>
              <li className="flex items-center text-white">
                <span className="text-green-400 mr-2">✓</span>
                Multiple AI personalities
              </li>
              <li className="flex items-center text-white">
                <span className="text-green-400 mr-2">✓</span>
                Smart nudges & reminders
              </li>
              <li className="flex items-center text-white">
                <span className="text-green-400 mr-2">✓</span>
                Priority support
              </li>
              <li className="flex items-center text-white">
                <span className="text-green-400 mr-2">✓</span>
                Integration with apps & services
              </li>
            </ul>
            
            <button
              onClick={() => window.location.href = '/signup'}
              className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Pro Trial
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-white mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-white mb-2">₹1,999</div>
              <p className="text-gray-300">per month</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-300">
                <span className="text-green-400 mr-2">✓</span>
                Everything in Pro
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-green-400 mr-2">✓</span>
                Custom AI training
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-green-400 mr-2">✓</span>
                Team collaboration features
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-green-400 mr-2">✓</span>
                Advanced analytics
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-green-400 mr-2">✓</span>
                24/7 dedicated support
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-green-400 mr-2">✓</span>
                Custom integrations
              </li>
            </ul>
            
            <button
              onClick={() => alert('Contact us for Enterprise pricing at enterprise@rajniai.com')}
              className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-300">Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-2">Is there a free trial for Pro?</h3>
              <p className="text-gray-300">Yes! We offer a 7-day free trial for the Pro plan. No credit card required to start.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-300">We accept all major credit cards, debit cards, UPI, and net banking for Indian customers.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-2">Is my data secure?</h3>
              <p className="text-gray-300">Absolutely! We use enterprise-grade encryption and never share your personal data with third parties.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 