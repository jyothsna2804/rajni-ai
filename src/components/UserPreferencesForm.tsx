'use client';

import { useState, useEffect } from 'react';

interface UserPreferencesFormProps {
  userId: string;
  onSubmit?: (preferences: any) => void;
}

export default function UserPreferencesForm({ userId, onSubmit }: UserPreferencesFormProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
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
    frequentFlightRoutes: [] as string[],
    cabTypePreference: '',

    // Shopping Preferences
    ecommerceSites: [] as string[],
    favoriteBrands: [] as string[],
    productCategories: [] as string[],
    monthlyShoppingBudget: '',
    preferredPaymentMethod: '',
    spendingLimits: { daily: '', weekly: '', monthly: '' },

    // Location Preferences
    homeLocation: '',
    workLocation: '',

    // Payment Preferences
    paymentMethods: [] as string[],

    // Work Preferences
    calendarApp: '',
    workingHours: { start: '', end: '' }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing preferences when component mounts
  useEffect(() => {
    const loadExistingPreferences = async () => {
      if (!userId) return;
      
      try {
        const response = await fetch(`/api/user-preferences?userId=${userId}`);
        if (response.ok) {
          const existingPreferences = await response.json();
          console.log('Loaded existing preferences:', existingPreferences);
          
          // Merge existing preferences with default values
          setPreferences(prev => ({
            ...prev,
            ...existingPreferences,
            // Ensure arrays are properly handled
            groceryApps: existingPreferences.groceryApps || [],
            foodApps: existingPreferences.foodApps || [],
            preferredCuisines: existingPreferences.preferredCuisines || [],
            goToRestaurants: existingPreferences.goToRestaurants || [],
            flightBookingSites: existingPreferences.flightBookingSites || [],
            cabServices: existingPreferences.cabServices || [],
            frequentFlightRoutes: existingPreferences.frequentFlightRoutes || [],
            ecommerceSites: existingPreferences.ecommerceSites || [],
            favoriteBrands: existingPreferences.favoriteBrands || [],
            productCategories: existingPreferences.productCategories || [],
            paymentMethods: existingPreferences.paymentMethods || [],
            // Ensure objects are properly handled
            usualMealTimes: existingPreferences.usualMealTimes || { lunch: '', dinner: '' },
            flightPreferences: existingPreferences.flightPreferences || { class: 'economy', seat: 'window' },
            spendingLimits: existingPreferences.spendingLimits || { daily: '', weekly: '', monthly: '' },
            workingHours: existingPreferences.workingHours || { start: '', end: '' }
          }));
        } else if (response.status === 404) {
          console.log('No existing preferences found - using defaults');
        } else {
          console.error('Error loading preferences:', response.status);
        }
      } catch (error) {
        console.error('Error loading existing preferences:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadExistingPreferences();
  }, [userId]);

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field as keyof typeof prev] as string[], value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/user-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, preferences })
      });

      if (response.ok) {
        onSubmit?.(preferences);
      } else {
        console.error('Failed to save preferences');
        alert('Failed to save preferences. Please try again.');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Error saving preferences. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">🍽️ Food & Grocery Preferences</h3>
      
      {/* Grocery Apps */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Grocery Apps</label>
        <div className="grid grid-cols-2 gap-3">
          {['BigBasket', 'Zepto', 'Blinkit', 'Grofers', 'Amazon Fresh', 'Dunzo', 'Instamart'].map(app => (
            <label key={app} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.groceryApps.includes(app)}
                onChange={(e) => handleArrayChange('groceryApps', app, e.target.checked)}
                className="rounded border-gray-600 bg-gray-700 text-emerald-500"
              />
              <span className="text-gray-300">{app}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Food Apps */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Food Delivery Apps</label>
        <div className="grid grid-cols-2 gap-3">
          {['Swiggy', 'Zomato', 'Dunzo', 'Uber Eats', 'Zomato Pro', 'Swiggy One'].map(app => (
            <label key={app} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.foodApps.includes(app)}
                onChange={(e) => handleArrayChange('foodApps', app, e.target.checked)}
                className="rounded border-gray-600 bg-gray-700 text-emerald-500"
              />
              <span className="text-gray-300">{app}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Preferred Cuisines */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Cuisines</label>
        <div className="grid grid-cols-2 gap-3">
          {['Indian', 'Chinese', 'Italian', 'Japanese', 'Mexican', 'Thai', 'Mediterranean', 'American', 'Korean', 'French', 'Middle Eastern', 'Vietnamese'].map(cuisine => (
            <label key={cuisine} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.preferredCuisines.includes(cuisine)}
                onChange={(e) => handleArrayChange('preferredCuisines', cuisine, e.target.checked)}
                className="rounded border-gray-600 bg-gray-700 text-emerald-500"
              />
              <span className="text-gray-300">{cuisine}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Dietary Preferences */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Dietary Preferences</label>
        <div className="space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={preferences.isVegetarian}
              onChange={(e) => setPreferences(prev => ({ ...prev, isVegetarian: e.target.checked }))}
              className="rounded border-gray-600 bg-gray-700 text-emerald-500"
            />
            <span className="text-gray-300">Vegetarian</span>
          </label>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Spice Tolerance</label>
            <select
              value={preferences.spiceToleranceLevel}
              onChange={(e) => setPreferences(prev => ({ ...prev, spiceToleranceLevel: e.target.value }))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="">Select spice tolerance</option>
              <option value="mild">Mild (No spice)</option>
              <option value="medium">Medium (Some spice)</option>
              <option value="hot">Hot (Spicy)</option>
              <option value="very-hot">Very Hot (Extra spicy)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Delivery Time Preference */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Delivery Time</label>
        <select
          value={preferences.deliveryTimePreference}
          onChange={(e) => setPreferences(prev => ({ ...prev, deliveryTimePreference: e.target.value }))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="">Select delivery time</option>
          <option value="asap">As soon as possible</option>
          <option value="30min">Within 30 minutes</option>
          <option value="1hour">Within 1 hour</option>
          <option value="2hours">Within 2 hours</option>
          <option value="specific">Specific time</option>
        </select>
      </div>

      {/* Go-to Restaurants */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Favorite Restaurant Types</label>
        <div className="grid grid-cols-2 gap-3">
          {['Fine Dining', 'Casual Dining', 'Fast Food', 'Street Food', 'Cafes', 'Bars', 'Food Courts', 'Home Delivery Only'].map(type => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.goToRestaurants.includes(type)}
                onChange={(e) => handleArrayChange('goToRestaurants', type, e.target.checked)}
                className="rounded border-gray-600 bg-gray-700 text-emerald-500"
              />
              <span className="text-gray-300">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">✈️ Travel & Transportation</h3>
      
      {/* Flight Booking Sites */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Flight Booking Sites</label>
        <div className="grid grid-cols-2 gap-3">
          {['MakeMyTrip', 'Goibibo', 'Yatra', 'Cleartrip', 'Booking.com', 'Skyscanner', 'Kayak', 'Expedia'].map(site => (
            <label key={site} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.flightBookingSites.includes(site)}
                onChange={(e) => handleArrayChange('flightBookingSites', site, e.target.checked)}
                className="rounded border-gray-600 bg-gray-700 text-emerald-500"
              />
              <span className="text-gray-300">{site}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Frequent Flight Routes */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Frequent Flight Routes</label>
        <div className="grid grid-cols-2 gap-3">
          {['Delhi-Mumbai', 'Bangalore-Delhi', 'Mumbai-Bangalore', 'Chennai-Bangalore', 'Hyderabad-Bangalore', 'Kolkata-Delhi', 'Pune-Mumbai', 'Ahmedabad-Mumbai'].map(route => (
            <label key={route} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.frequentFlightRoutes.includes(route)}
                onChange={(e) => handleArrayChange('frequentFlightRoutes', route, e.target.checked)}
                className="rounded border-gray-600 bg-gray-700 text-emerald-500"
              />
              <span className="text-gray-300">{route}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Flight Preferences */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Flight Class Preference</label>
        <select
          value={preferences.flightPreferences.class}
          onChange={(e) => setPreferences(prev => ({ 
            ...prev, 
            flightPreferences: { ...prev.flightPreferences, class: e.target.value }
          }))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="economy">Economy</option>
          <option value="premium-economy">Premium Economy</option>
          <option value="business">Business</option>
          <option value="first">First Class</option>
        </select>
      </div>

      {/* Cab Services */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Cab Services</label>
        <div className="grid grid-cols-2 gap-3">
          {['Uber', 'Ola', 'Rapido', 'Meru', 'Auto', 'Local Taxi'].map(service => (
            <label key={service} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.cabServices.includes(service)}
                onChange={(e) => handleArrayChange('cabServices', service, e.target.checked)}
                className="rounded border-gray-600 bg-gray-700 text-emerald-500"
              />
              <span className="text-gray-300">{service}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Cab Type Preference */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Cab Type</label>
        <select
          value={preferences.cabTypePreference}
          onChange={(e) => setPreferences(prev => ({ ...prev, cabTypePreference: e.target.value }))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="">Select cab type</option>
          <option value="mini">Mini (Economy)</option>
          <option value="prime">Prime (Sedan)</option>
          <option value="auto">Auto Rickshaw</option>
          <option value="bike">Bike Taxi</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">🛒 Shopping & Payment</h3>
      
      {/* E-commerce Sites */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">E-commerce Sites</label>
        <div className="grid grid-cols-2 gap-3">
          {['Amazon', 'Flipkart', 'Myntra', 'Nykaa', 'Ajio', 'Snapdeal', 'ShopClues', 'Paytm Mall'].map(site => (
            <label key={site} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.ecommerceSites.includes(site)}
                onChange={(e) => handleArrayChange('ecommerceSites', site, e.target.checked)}
                className="rounded border-gray-600 bg-gray-700 text-emerald-500"
              />
              <span className="text-gray-300">{site}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Product Categories */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Product Categories</label>
        <div className="grid grid-cols-2 gap-3">
          {['Electronics', 'Fashion', 'Beauty', 'Home & Kitchen', 'Books', 'Sports', 'Automotive', 'Health', 'Baby Products', 'Pet Supplies', 'Garden', 'Tools'].map(category => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.productCategories.includes(category)}
                onChange={(e) => handleArrayChange('productCategories', category, e.target.checked)}
                className="rounded border-gray-600 bg-gray-700 text-emerald-500"
              />
              <span className="text-gray-300">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Favorite Brands */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Favorite Brands</label>
        <div className="grid grid-cols-2 gap-3">
          {['Apple', 'Samsung', 'Nike', 'Adidas', 'Zara', 'H&M', 'Lakme', 'Maybelline', 'Puma', 'Reebok', 'Sony', 'LG'].map(brand => (
            <label key={brand} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.favoriteBrands.includes(brand)}
                onChange={(e) => handleArrayChange('favoriteBrands', brand, e.target.checked)}
                className="rounded border-gray-600 bg-gray-700 text-emerald-500"
              />
              <span className="text-gray-300">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Monthly Shopping Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Shopping Budget</label>
        <select
          value={preferences.monthlyShoppingBudget}
          onChange={(e) => setPreferences(prev => ({ ...prev, monthlyShoppingBudget: e.target.value }))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="">Select budget range</option>
          <option value="under-5k">Under ₹5,000</option>
          <option value="5k-10k">₹5,000 - ₹10,000</option>
          <option value="10k-20k">₹10,000 - ₹20,000</option>
          <option value="20k-50k">₹20,000 - ₹50,000</option>
          <option value="above-50k">Above ₹50,000</option>
        </select>
      </div>

      {/* Payment Methods */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Payment Methods</label>
        <div className="grid grid-cols-2 gap-3">
          {['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash on Delivery', 'Digital Wallets', 'EMI'].map(method => (
            <label key={method} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.paymentMethods.includes(method)}
                onChange={(e) => handleArrayChange('paymentMethods', method, e.target.checked)}
                className="rounded border-gray-600 bg-gray-700 text-emerald-500"
              />
              <span className="text-gray-300">{method}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Preferred Payment Method */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Most Preferred Payment Method</label>
        <select
          value={preferences.preferredPaymentMethod}
          onChange={(e) => setPreferences(prev => ({ ...prev, preferredPaymentMethod: e.target.value }))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="">Select preferred method</option>
          <option value="UPI">UPI</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Net Banking">Net Banking</option>
          <option value="Digital Wallets">Digital Wallets</option>
        </select>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">📍 Location & Work</h3>
      
      {/* Home Location */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Home Location</label>
        <input
          type="text"
          value={preferences.homeLocation}
          onChange={(e) => setPreferences(prev => ({ ...prev, homeLocation: e.target.value }))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
          placeholder="e.g., Indiranagar, Bangalore"
        />
      </div>

      {/* Work Location */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Work Location</label>
        <input
          type="text"
          value={preferences.workLocation}
          onChange={(e) => setPreferences(prev => ({ ...prev, workLocation: e.target.value }))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
          placeholder="e.g., HSR Layout, Bangalore"
        />
      </div>

      {/* Calendar App */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Calendar App</label>
        <select
          value={preferences.calendarApp}
          onChange={(e) => setPreferences(prev => ({ ...prev, calendarApp: e.target.value }))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="">Select calendar app</option>
          <option value="Google Calendar">Google Calendar</option>
          <option value="Outlook">Outlook</option>
          <option value="Apple Calendar">Apple Calendar</option>
          <option value="Microsoft Teams">Microsoft Teams</option>
          <option value="Slack">Slack</option>
          <option value="None">None</option>
        </select>
      </div>

      {/* Working Hours */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Working Hours</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Start Time</label>
            <input
              type="time"
              value={preferences.workingHours.start}
              onChange={(e) => setPreferences(prev => ({ 
                ...prev, 
                workingHours: { ...prev.workingHours, start: e.target.value }
              }))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">End Time</label>
            <input
              type="time"
              value={preferences.workingHours.end}
              onChange={(e) => setPreferences(prev => ({ 
                ...prev, 
                workingHours: { ...prev.workingHours, end: e.target.value }
              }))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Usual Meal Times */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Usual Meal Times</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Lunch Time</label>
            <input
              type="time"
              value={preferences.usualMealTimes.lunch}
              onChange={(e) => setPreferences(prev => ({ 
                ...prev, 
                usualMealTimes: { ...prev.usualMealTimes, lunch: e.target.value }
              }))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Dinner Time</label>
            <input
              type="time"
              value={preferences.usualMealTimes.dinner}
              onChange={(e) => setPreferences(prev => ({ 
                ...prev, 
                usualMealTimes: { ...prev.usualMealTimes, dinner: e.target.value }
              }))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Show loading state while fetching existing preferences
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Step {step} of 4</span>
          <span className="text-sm text-emerald-400">{Math.round((step / 4) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Saving...' : 'Save Preferences'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 