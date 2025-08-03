'use client';

import { useState, useEffect } from 'react';

interface UserPreferencesFormProps {
  userId: string;
  onSubmit?: (preferences: any) => void;
}

export default function UserPreferencesForm({ userId, onSubmit }: UserPreferencesFormProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [preferences, setPreferences] = useState({
    // Food & Grocery Preferences
    groceryApps: [] as string[],
    foodApps: [] as string[],
    preferredCuisines: [] as string[],
    usualMealTimes: { lunch: '', dinner: '' },
    isVegetarian: false,
    spiceToleranceLevel: '',
    deliveryTimePreference: '',
    goToRestaurants: [] as string[],

    // Travel Preferences
    flightBookingSites: [] as string[],
    flightPreferences: { class: 'economy', seat: 'window' },
    cabServices: [] as string[],
    cabTypePreference: '',
    frequentFlightRoutes: [] as string[],

    // Shopping Preferences
    ecommerceSites: [] as string[],
    favoriteBrands: [] as string[],
    productCategories: [] as string[],
    monthlyShoppingBudget: '',
    preferredPaymentMethod: '',
    paymentMethods: [] as string[],
    spendingLimits: {},

    // Location Preferences
    homeLocation: '',
    workLocation: '',

    // Work Preferences
    calendarApp: '',
    workingHours: { start: '', end: '' },

    // AI Behavior Preferences
    aiPersonality: 'FRIENDLY' as string,
    responseLength: 'DETAILED' as string,
    budgetLevel: 'MEDIUM' as string
  });

  // Load existing preferences on component mount
  useEffect(() => {
    const loadExistingPreferences = async () => {
      try {
        const response = await fetch(`/api/user-preferences?userId=${userId}`);
        if (response.ok) {
          const existingPreferences = await response.json();
          console.log('Loaded existing preferences:', existingPreferences);
          
          // Merge existing preferences with default values
          setPreferences(prev => ({
            ...prev,
            ...existingPreferences
          }));
          setIsEditing(true); // User is editing existing preferences
        } else {
          console.log('No existing preferences found, starting fresh');
          setIsEditing(false); // User is creating new preferences
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
        setIsEditing(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      loadExistingPreferences();
    } else {
      setIsLoading(false);
    }
  }, [userId]);

  const handleCheckboxChange = (category: string, value: string) => {
    setPreferences(prev => {
      const currentArray = prev[category as keyof typeof prev] as string[];
      return {
        ...prev,
        [category]: currentArray.includes(value)
          ? currentArray.filter((item: string) => item !== value)
          : [...currentArray, value]
      };
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parent: string, field: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof typeof prev] as object),
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitting preferences:', preferences);
      
      const response = await fetch('/api/user-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          preferences
        }),
      });

      if (response.ok) {
        const message = isEditing 
          ? 'Your preferences have been updated successfully!' 
          : 'Your preferences have been saved successfully!';
        
        alert(message);
        
        if (onSubmit) {
          onSubmit(preferences);
        } else if (!isEditing) {
          // Only show the voice chat dialog for new users
          const testVoiceChat = confirm('Would you like to test RajniAI now?');
          if (testVoiceChat) {
            window.location.href = '/voice-chat';
          } else {
            window.location.href = '/';
          }
        } else {
          // For editing, go back to dashboard
          window.location.href = '/dashboard';
        }
      } else {
        const errorData = await response.json();
        alert(`Error saving preferences: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Error saving preferences. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your preferences...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {isEditing ? '✏️ Edit Your Preferences' : '🎯 Set Your Preferences'}
          </h1>
          <p className="text-xl text-gray-300">
            {isEditing 
              ? 'Update your preferences to personalize your RajniAI experience'
              : 'Help RajniAI understand your preferences for a personalized experience'
            }
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((stepNum) => (
              <div
                key={stepNum}
                className={`w-3 h-3 rounded-full ${
                  step >= stepNum ? 'bg-purple-500' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
          {/* Step 1: Food & Grocery Preferences */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">🍽️ Food & Grocery Preferences</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Grocery Apps */}
                <div>
                  <label className="block text-white font-semibold mb-3">Preferred Grocery Apps:</label>
                  <div className="space-y-2">
                    {['BigBasket', 'Grofers', 'Amazon Fresh', 'Flipkart Grocery', 'Blinkit', 'Zepto', 'Swiggy Instamart'].map((app) => (
                      <label key={app} className="flex items-center text-white">
                        <input
                          type="checkbox"
                          checked={preferences.groceryApps.includes(app)}
                          onChange={() => handleCheckboxChange('groceryApps', app)}
                          className="mr-2"
                        />
                        {app}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Food Delivery Apps */}
                <div>
                  <label className="block text-white font-semibold mb-3">Preferred Food Apps:</label>
                  <div className="space-y-2">
                    {['Swiggy', 'Zomato', 'Uber Eats', 'Dominos', 'Pizza Hut', 'KFC', 'McDonald\'s'].map((app) => (
                      <label key={app} className="flex items-center text-white">
                        <input
                          type="checkbox"
                          checked={preferences.foodApps.includes(app)}
                          onChange={() => handleCheckboxChange('foodApps', app)}
                          className="mr-2"
                        />
                        {app}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Preferred Cuisines */}
                <div>
                  <label className="block text-white font-semibold mb-3">Preferred Cuisines:</label>
                  <div className="space-y-2">
                    {['Indian', 'Chinese', 'Italian', 'Mexican', 'Thai', 'Japanese', 'Mediterranean', 'American'].map((cuisine) => (
                      <label key={cuisine} className="flex items-center text-white">
                        <input
                          type="checkbox"
                          checked={preferences.preferredCuisines.includes(cuisine)}
                          onChange={() => handleCheckboxChange('preferredCuisines', cuisine)}
                          className="mr-2"
                        />
                        {cuisine}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Dietary Preferences */}
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center text-white">
                      <input
                        type="checkbox"
                        checked={preferences.isVegetarian}
                        onChange={(e) => handleInputChange('isVegetarian', e.target.checked)}
                        className="mr-2"
                      />
                      I am vegetarian
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Spice Tolerance:</label>
                    <select
                      value={preferences.spiceToleranceLevel}
                      onChange={(e) => handleInputChange('spiceToleranceLevel', e.target.value)}
                      className="w-full p-2 rounded-lg bg-white/20 text-white border border-white/30"
                    >
                      <option value="">Select spice level</option>
                      <option value="Mild">Mild</option>
                      <option value="Medium">Medium</option>
                      <option value="Spicy">Spicy</option>
                      <option value="Very Spicy">Very Spicy</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Travel Preferences */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">✈️ Travel Preferences</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Flight Booking Sites */}
                <div>
                  <label className="block text-white font-semibold mb-3">Flight Booking Sites:</label>
                  <div className="space-y-2">
                    {['MakeMyTrip', 'Cleartrip', 'Goibibo', 'Yatra', 'Booking.com', 'Expedia', 'IndiGo', 'Air India'].map((site) => (
                      <label key={site} className="flex items-center text-white">
                        <input
                          type="checkbox"
                          checked={preferences.flightBookingSites.includes(site)}
                          onChange={() => handleCheckboxChange('flightBookingSites', site)}
                          className="mr-2"
                        />
                        {site}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Cab Services */}
                <div>
                  <label className="block text-white font-semibold mb-3">Preferred Cab Services:</label>
                  <div className="space-y-2">
                    {['Uber', 'Ola', 'Rapido', 'Meru', 'Local Taxi'].map((service) => (
                      <label key={service} className="flex items-center text-white">
                        <input
                          type="checkbox"
                          checked={preferences.cabServices.includes(service)}
                          onChange={() => handleCheckboxChange('cabServices', service)}
                          className="mr-2"
                        />
                        {service}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Flight Preferences */}
                <div>
                  <label className="block text-white font-semibold mb-2">Flight Class:</label>
                  <select
                    value={preferences.flightPreferences.class}
                    onChange={(e) => handleNestedInputChange('flightPreferences', 'class', e.target.value)}
                    className="w-full p-2 rounded-lg bg-white/20 text-white border border-white/30 mb-4"
                  >
                    <option value="economy">Economy</option>
                    <option value="premium-economy">Premium Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                  
                  <label className="block text-white font-semibold mb-2">Seat Preference:</label>
                  <select
                    value={preferences.flightPreferences.seat}
                    onChange={(e) => handleNestedInputChange('flightPreferences', 'seat', e.target.value)}
                    className="w-full p-2 rounded-lg bg-white/20 text-white border border-white/30"
                  >
                    <option value="window">Window</option>
                    <option value="aisle">Aisle</option>
                    <option value="middle">Middle</option>
                  </select>
                </div>

                {/* Locations */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Home Location:</label>
                    <input
                      type="text"
                      value={preferences.homeLocation}
                      onChange={(e) => handleInputChange('homeLocation', e.target.value)}
                      placeholder="e.g., Bangalore, Indiranagar"
                      className="w-full p-2 rounded-lg bg-white/20 text-white border border-white/30 placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Work Location:</label>
                    <input
                      type="text"
                      value={preferences.workLocation}
                      onChange={(e) => handleInputChange('workLocation', e.target.value)}
                      placeholder="e.g., Bangalore, HSR Layout"
                      className="w-full p-2 rounded-lg bg-white/20 text-white border border-white/30 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Shopping Preferences */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">🛒 Shopping Preferences</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* E-commerce Sites */}
                <div>
                  <label className="block text-white font-semibold mb-3">E-commerce Sites:</label>
                  <div className="space-y-2">
                    {['Amazon', 'Flipkart', 'Myntra', 'Ajio', 'Nykaa', 'FirstCry', 'BigBasket', 'Pepperfry'].map((site) => (
                      <label key={site} className="flex items-center text-white">
                        <input
                          type="checkbox"
                          checked={preferences.ecommerceSites.includes(site)}
                          onChange={() => handleCheckboxChange('ecommerceSites', site)}
                          className="mr-2"
                        />
                        {site}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <label className="block text-white font-semibold mb-3">Payment Methods:</label>
                  <div className="space-y-2">
                    {['Credit Card', 'Debit Card', 'UPI', 'GPay', 'PhonePe', 'Paytm', 'Net Banking', 'Cash on Delivery'].map((method) => (
                      <label key={method} className="flex items-center text-white">
                        <input
                          type="checkbox"
                          checked={preferences.paymentMethods.includes(method)}
                          onChange={() => handleCheckboxChange('paymentMethods', method)}
                          className="mr-2"
                        />
                        {method}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-white font-semibold mb-2">Monthly Shopping Budget:</label>
                  <input
                    type="text"
                    value={preferences.monthlyShoppingBudget}
                    onChange={(e) => handleInputChange('monthlyShoppingBudget', e.target.value)}
                    placeholder="e.g., ₹10,000"
                    className="w-full p-2 rounded-lg bg-white/20 text-white border border-white/30 placeholder-gray-400"
                  />
                </div>

                {/* Calendar App */}
                <div>
                  <label className="block text-white font-semibold mb-2">Calendar App:</label>
                  <select
                    value={preferences.calendarApp}
                    onChange={(e) => handleInputChange('calendarApp', e.target.value)}
                    className="w-full p-2 rounded-lg bg-white/20 text-white border border-white/30"
                  >
                    <option value="">Select calendar app</option>
                    <option value="Google Calendar">Google Calendar</option>
                    <option value="Outlook">Outlook</option>
                    <option value="Apple Calendar">Apple Calendar</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: AI Behavior Preferences */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">🤖 AI Behavior Preferences</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">AI Personality:</label>
                  <select
                    value={preferences.aiPersonality}
                    onChange={(e) => handleInputChange('aiPersonality', e.target.value)}
                    className="w-full p-2 rounded-lg bg-white/20 text-white border border-white/30"
                  >
                    <option value="FRIENDLY">Friendly & Casual</option>
                    <option value="PROFESSIONAL">Professional & Formal</option>
                    <option value="CASUAL">Very Casual</option>
                    <option value="ENTHUSIASTIC">Enthusiastic & Energetic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Response Length:</label>
                  <select
                    value={preferences.responseLength}
                    onChange={(e) => handleInputChange('responseLength', e.target.value)}
                    className="w-full p-2 rounded-lg bg-white/20 text-white border border-white/30"
                  >
                    <option value="SHORT">Short & Concise</option>
                    <option value="MEDIUM">Medium Length</option>
                    <option value="DETAILED">Detailed & Comprehensive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Budget Level:</label>
                  <select
                    value={preferences.budgetLevel}
                    onChange={(e) => handleInputChange('budgetLevel', e.target.value)}
                    className="w-full p-2 rounded-lg bg-white/20 text-white border border-white/30"
                  >
                    <option value="LOW">Budget-Conscious</option>
                    <option value="MEDIUM">Moderate Budget</option>
                    <option value="HIGH">Premium/Luxury</option>
                  </select>
                </div>

                {/* Working Hours */}
                <div>
                  <label className="block text-white font-semibold mb-2">Working Hours:</label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      value={preferences.workingHours.start}
                      onChange={(e) => handleNestedInputChange('workingHours', 'start', e.target.value)}
                      className="flex-1 p-2 rounded-lg bg-white/20 text-white border border-white/30"
                    />
                    <span className="text-white self-center">to</span>
                    <input
                      type="time"
                      value={preferences.workingHours.end}
                      onChange={(e) => handleNestedInputChange('workingHours', 'end', e.target.value)}
                      className="flex-1 p-2 rounded-lg bg-white/20 text-white border border-white/30"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              Previous
            </button>
            
            {step < 4 ? (
              <button
                onClick={() => setStep(Math.min(4, step + 1))}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                {isEditing ? 'Update Preferences' : 'Save Preferences'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 