'use client';

import { useState, useEffect } from 'react';

interface ProfileData {
  fullName: string;
  nickname: string;
  email: string;
  gender: string;
  birthday: string;
  homeAddress: string;
  workAddress: string;
  frequentLocations: string[];
  workingHours: { start: string; end: string };
  aiPersonality: string;
  responseLength: string;
  budgetLevel: string;
  nudgePermission: boolean;
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    nickname: '',
    email: '',
    gender: '',
    birthday: '',
    homeAddress: '',
    workAddress: '',
    frequentLocations: [],
    workingHours: { start: '', end: '' },
    aiPersonality: 'FRIENDLY',
    responseLength: 'DETAILED',
    budgetLevel: 'MEDIUM',
    nudgePermission: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      // Load existing profile data
      loadProfileData(userData.id);
      
      // Pre-fill email from user data
      setProfileData(prev => ({
        ...prev,
        email: userData.email,
        fullName: userData.name
      }));
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadProfileData = async (userId: string) => {
    try {
      const response = await fetch(`/api/user-profiles?userId=${userId}`);
      if (response.ok) {
        const existingProfile = await response.json();
        console.log('Loaded existing profile:', existingProfile);
        setProfileData(prev => ({ ...prev, ...existingProfile }));
        setIsEditing(false); // Show view mode if profile exists
      } else if (response.status === 404) {
        console.log('No existing profile found - new user');
        setIsEditing(true); // Show edit mode for new users
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setIsEditing(true); // Default to edit mode on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string | string[] | boolean | { start: string; end: string }) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationToggle = (location: string) => {
    setProfileData(prev => ({
      ...prev,
      frequentLocations: prev.frequentLocations.includes(location)
        ? prev.frequentLocations.filter(l => l !== location)
        : [...prev.frequentLocations, location]
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/user-profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, profile: profileData })
      });

      if (response.ok) {
        setIsEditing(false);
        
        // Check if user already has preferences
        const preferencesResponse = await fetch(`/api/user-preferences?userId=${user.id}`);
        
        if (preferencesResponse.ok) {
          // User has preferences - redirect to voice chat
          alert('Profile updated successfully! Redirecting to voice chat...');
          setTimeout(() => {
            window.location.href = '/voice-chat';
          }, 1000);
        } else {
          // New user - redirect to preferences setup
          alert('Profile saved successfully! Now let\'s set up your preferences...');
          setTimeout(() => {
            window.location.href = '/preferences';
          }, 1000);
        }
      } else {
        throw new Error('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditPreferences = () => {
    window.location.href = '/preferences';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300 mb-4">Please sign in to access your profile.</p>
          <button
            onClick={() => window.location.href = '/signin'}
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{user.name}</h1>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Personal Profile</h2>
            
            {!isEditing ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Age:</span>
                  <span className="text-white">{profileData.age || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Gender:</span>
                  <span className="text-white">{profileData.gender || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Occupation:</span>
                  <span className="text-white">{profileData.occupation || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Lifestyle:</span>
                  <span className="text-white">{profileData.lifestyle || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Location:</span>
                  <span className="text-white">{profileData.location || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Family Status:</span>
                  <span className="text-white">{profileData.familyStatus || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Tech Savviness:</span>
                  <span className="text-white">{profileData.techSavviness || 'Not set'}</span>
                </div>
                <div>
                  <span className="text-gray-300">Interests:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profileData.interests.length > 0 ? (
                      profileData.interests.map(interest => (
                        <span key={interest} className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm">
                          {interest}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No interests set</span>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Age</label>
                  <input
                    type="number"
                    value={profileData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                    placeholder="Enter your age"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Gender</label>
                  <select
                    value={profileData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Occupation</label>
                  <input
                    type="text"
                    value={profileData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                    placeholder="e.g., Software Engineer, Student, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Lifestyle</label>
                  <select
                    value={profileData.lifestyle}
                    onChange={(e) => handleInputChange('lifestyle', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">Select lifestyle</option>
                    <option value="busy-professional">Busy Professional</option>
                    <option value="student">Student</option>
                    <option value="entrepreneur">Entrepreneur</option>
                    <option value="homemaker">Homemaker</option>
                    <option value="retired">Retired</option>
                    <option value="freelancer">Freelancer</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                    placeholder="e.g., Bangalore, India"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Family Status</label>
                  <select
                    value={profileData.familyStatus}
                    onChange={(e) => handleInputChange('familyStatus', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">Select family status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="married-with-kids">Married with Kids</option>
                    <option value="single-parent">Single Parent</option>
                    <option value="living-with-family">Living with Family</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Tech Savviness</label>
                  <select
                    value={profileData.techSavviness}
                    onChange={(e) => handleInputChange('techSavviness', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">Select tech level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Interests</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Technology', 'Travel', 'Food', 'Fitness', 'Music', 'Movies', 'Reading', 'Gaming', 'Art', 'Sports', 'Fashion', 'Cooking'].map(interest => (
                      <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData.interests.includes(interest)}
                          onChange={() => handleInterestToggle(interest)}
                          className="rounded border-white/20 bg-white/10 text-emerald-500 focus:ring-emerald-500"
                        />
                        <span className="text-gray-300 text-sm">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Save Profile
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Preferences Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Service Preferences</h2>
            <p className="text-gray-300 mb-6">
              Manage your service preferences for personalized AI recommendations.
            </p>
            
            <button
              onClick={handleEditPreferences}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Edit Preferences
            </button>
            
            <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <h3 className="text-emerald-300 font-semibold mb-2">💡 How this helps:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Personalized recommendations based on your profile</li>
                <li>• Better AI responses tailored to your lifestyle</li>
                <li>• Smarter suggestions for services and products</li>
                <li>• Improved voice chat experience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 