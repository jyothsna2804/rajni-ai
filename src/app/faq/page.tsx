'use client';

export default function FAQ() {
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
            ❓ Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300">
            Everything you need to know about RajniAI
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Getting Started */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">🚀 Getting Started</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">What is RajniAI?</h3>
                <p className="text-gray-300">RajniAI is your personal AI assistant that learns your preferences and helps you manage daily tasks through natural voice conversations. It can book cabs, draft emails, set reminders, and provide personalized recommendations based on your lifestyle.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">How do I get started?</h3>
                <p className="text-gray-300">Simply sign up with your email, complete the preferences setup to personalize your experience, and start chatting with RajniAI through voice or text. The setup takes less than 5 minutes!</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Do I need to download an app?</h3>
                <p className="text-gray-300">No! RajniAI works directly in your web browser. You can access it from any device - desktop, tablet, or mobile. Just visit our website and sign in.</p>
              </div>
            </div>
          </div>

          {/* Features & Functionality */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">⚡ Features & Functionality</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">What can RajniAI help me with?</h3>
                <p className="text-gray-300">RajniAI can help with:</p>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                  <li>Booking cabs and transportation</li>
                  <li>Ordering food from your favorite restaurants</li>
                  <li>Drafting emails and messages</li>
                  <li>Setting reminders and managing tasks</li>
                  <li>Finding flights and travel recommendations</li>
                  <li>Shopping suggestions based on your preferences</li>
                  <li>Calendar management and scheduling</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">How does voice chat work?</h3>
                <p className="text-gray-300">Simply click the microphone button and speak naturally. RajniAI uses advanced speech recognition to understand your requests and responds with both voice and text. You can have natural conversations just like talking to a friend.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Can I customize RajniAI's personality?</h3>
                <p className="text-gray-300">Yes! You can choose from different AI personalities (Friendly, Professional, Casual, Formal) and set response lengths (Short, Medium, Detailed) to match your communication style.</p>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">🔒 Privacy & Security</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Is my data safe and private?</h3>
                <p className="text-gray-300">Absolutely! We use enterprise-grade encryption to protect your data. Your conversations and preferences are stored securely and never shared with third parties. We comply with international data protection standards.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Do you store my voice recordings?</h3>
                <p className="text-gray-300">Voice recordings are processed in real-time for transcription and then immediately deleted. We only store the text version of your conversations to maintain context and improve your experience.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Can I delete my data?</h3>
                <p className="text-gray-300">Yes! You have full control over your data. You can delete specific conversations, reset your preferences, or completely delete your account and all associated data at any time from your profile settings.</p>
              </div>
            </div>
          </div>

          {/* Pricing & Plans */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">💳 Pricing & Plans</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Is there a free version?</h3>
                <p className="text-gray-300">Yes! Our free plan includes basic voice chat (10 messages/day), preference setup, and email support. Perfect for trying out RajniAI and basic daily tasks.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">What's included in the Pro plan?</h3>
                <p className="text-gray-300">Pro plan (₹499/month) includes unlimited voice chat, advanced personalization, multiple AI personalities, smart nudges, priority support, and integration with apps and services.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-300">Yes! There are no long-term contracts. You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at your next billing cycle.</p>
              </div>
            </div>
          </div>

          {/* Technical Support */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">🛠️ Technical Support</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">What browsers are supported?</h3>
                <p className="text-gray-300">RajniAI works on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best voice chat experience, we recommend using Chrome or Edge with microphone permissions enabled.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Why is voice chat not working?</h3>
                <p className="text-gray-300">Make sure you've allowed microphone permissions for our website. Check your browser settings and ensure your microphone is working. If issues persist, try refreshing the page or switching to text chat.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">How do I contact support?</h3>
                <p className="text-gray-300">You can reach our support team at support@rajniai.com. Pro users get priority support with faster response times. We typically respond within 24 hours for free users and 4 hours for Pro users.</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
            <p className="text-gray-300 mb-6">We're here to help! Contact our support team for personalized assistance.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => window.location.href = 'mailto:support@rajniai.com'}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                📧 Email Support
              </button>
              <button
                onClick={() => window.location.href = '/signup'}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                🚀 Try RajniAI Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 