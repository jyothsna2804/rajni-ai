'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export default function VoiceChat() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', content: string, timestamp: Date}>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [user, setUser] = useState({ name: 'User', email: 'user@example.com' });
  
  const isProcessingRef = useRef(false);
  const conversationRef = useRef<Array<{role: 'user' | 'assistant', content: string, timestamp: Date}>>([]);
  const lastMessageRef = useRef<string>(''); // Track the last message to prevent duplicates

  // Initialize conversation with Rajni's welcome message
  useEffect(() => {
    const welcomeMessage = {
      role: 'assistant' as const,
      content: "Hello! I'm Rajni, your personal AI assistant. How can I help you today?",
      timestamp: new Date()
    };
    setConversation([welcomeMessage]);
    conversationRef.current = [welcomeMessage];
    
    // Load user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    }
  }, []);

  // Update ref whenever conversation changes
  useEffect(() => {
    conversationRef.current = conversation;
  }, [conversation]);

  const sendMessage = useCallback(async (message: string) => {
    if (isProcessingRef.current) return;
    
    // Prevent duplicate messages
    if (lastMessageRef.current === message) {
      console.log('Duplicate message detected, skipping:', message);
      return;
    }
    
    isProcessingRef.current = true;
    setIsProcessing(true);
    lastMessageRef.current = message; // Track this message
    
    try {
      // Add user message to conversation
      const userEntry = {
        role: 'user' as const,
        content: message,
        timestamp: new Date()
      };
      
      // Update conversation state
      const currentConversation = [...conversationRef.current, userEntry];
      setConversation(currentConversation);
      conversationRef.current = currentConversation;
      
      console.log('Current conversation length:', currentConversation.length);
      console.log('Conversation history:', currentConversation.map(msg => `${msg.role}: ${msg.content.substring(0, 50)}...`));
      
      // Send to API with the updated conversation
      await sendToAPI(message, currentConversation);

    } catch (error) {
      console.error('Error processing message:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      isProcessingRef.current = false;
      setIsProcessing(false);
      setInputMessage('');
      lastMessageRef.current = ''; // Reset for next message
    }
  }, []); // Remove conversation dependency to prevent re-renders

  const sendToAPI = async (message: string, currentConversation: any[]) => {
    // Prevent duplicate API calls
    if (!isProcessingRef.current) {
      console.log('API call blocked - processing already in progress');
      return;
    }
    
    try {
      // Get user ID from localStorage
      const storedUser = localStorage.getItem('user');
      const userData = storedUser ? JSON.parse(storedUser) : null;
      const userId = userData?.id;
      console.log('User ID for AI processing:', userId);
      
      const aiResponse: Response = await fetch('/api/voice/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: message,
          conversation: currentConversation, // Send the updated conversation with the new user message
          userId: userId // Send user ID for personalized responses
        })
      });

      console.log('AI response status:', aiResponse.status);
      
      if (!aiResponse.ok) {
        const errorText: string = await aiResponse.text();
        console.error('AI processing error:', errorText);
        throw new Error(`AI processing failed: ${aiResponse.status} - ${errorText}`);
      }

      const aiData: { response: string } = await aiResponse.json();
      console.log('AI response result:', aiData);
      
      const aiMessage: string = aiData.response;

      // Add AI response to conversation
      const aiEntry = {
        role: 'assistant' as const,
        content: aiMessage,
        timestamp: new Date()
      };
      
      // Update conversation with AI response
      const updatedConversation = [...currentConversation, aiEntry];
      setConversation(updatedConversation);
      conversationRef.current = updatedConversation;
      
      console.log('Updated conversation with AI response, total length:', updatedConversation.length);

    } catch (error) {
      console.error('Error sending to API:', error);
      throw error;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && !isProcessing) {
      sendMessage(inputMessage);
    }
  };

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          💬 Chat with RajniAI
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Dashboard
          </button>
          <button
            onClick={() => window.location.href = '/profile'}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            👤 Profile
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Controls */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Chat Controls</h2>
              
              {/* Message Input */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message here..."
                    disabled={isProcessing}
                    className="w-full h-32 p-3 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-emerald-400 disabled:opacity-50"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isProcessing || !inputMessage.trim()}
                  className="w-full px-4 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                >
                  {isProcessing ? 'Sending...' : 'Send Message'}
                </button>
              </form>

              {/* Status */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-300 mb-2">Status</p>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  isProcessing ? 'bg-yellow-500/20 text-yellow-400' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {isProcessing ? 'Processing...' : 'Ready'}
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
                <h3 className="text-sm font-medium text-white mb-2">💡 Try saying:</h3>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• "What's my schedule for today?"</li>
                  <li>• "Book me a cab for tomorrow"</li>
                  <li>• "Draft an email to my boss"</li>
                  <li>• "Plan my weekend activities"</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Conversation */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 h-96 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Conversation</h2>
                <div className="text-xs text-gray-400">
                  Messages: {conversation.length} | Memory: {Math.min(conversation.length, 5)}/5 | Model: GPT-3.5 Turbo
                </div>
              </div>
              
              <div className="space-y-4">
                {conversation.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-gray-200'
                      }`}
                    >
                      <div className="text-sm">{message.content}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {conversation.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    <div className="text-4xl mb-2">💬</div>
                    <div>Start chatting with RajniAI!</div>
                    <div className="text-sm mt-2">Try saying: "Book me a cab" or "Draft an email"</div>
                  </div>
                )}
                
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700 text-gray-200 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span className="text-sm">Rajni is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
} 