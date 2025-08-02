'use client';

import { useState, useEffect } from 'react';
import UserPreferencesForm from '@/components/UserPreferencesForm';

export default function PreferencesPage() {
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Get user ID from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserId(userData.id);
    }
  }, []);

  const handlePreferencesSubmit = (preferences: any) => {
    console.log('Preferences saved:', preferences);
    
    // Show confirmation dialog
    const wantsToTest = confirm('🎉 Great! Your preferences have been saved successfully!\n\nWould you like to test RajniAI now?\n\nClick "OK" to go to voice chat\nClick "Cancel" to go back to main menu');
    
    if (wantsToTest) {
      // User wants to test - go to voice chat
      window.location.href = '/voice-chat';
    } else {
      // User doesn't want to test - go back to landing page
      window.location.href = '/';
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header for new users */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">🎯 Personalize Your RajniAI</h1>
          <p className="text-gray-300 text-lg">
            Let's set up your preferences to make RajniAI work perfectly for you!
          </p>
        </div>
        
        <UserPreferencesForm 
          userId={userId} 
          onSubmit={handlePreferencesSubmit}
        />
      </div>
    </div>
  );
} 