'use client';

import { useState, useEffect } from 'react';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    nickname: '',
    gender: '',
    birthday: '',
    homeAddress: '',
    workAddress: '',
    frequentLocations: [] as string[],
    workingHours: { start: '', end: '' },
    aiPersonality: 'FRIENDLY',
    responseLength: 'DETAILED',
    nudgePermission: true
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      window.location.href = '/signin';
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
             // Initialize form with user data
       setFormData(prev => ({
         ...prev,
         fullName: parsedUser.name || ''
       }));
      
      // Try to load existing profile
      if (parsedUser.id) {
        fetch(`/api/user-profiles?userId=${parsedUser.id}`)
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            throw new Error('Profile not found');
          })
          .then(data => {
            setProfile(data);
            // Update form with existing profile data
            setFormData(prev => ({
              ...prev,
              fullName: data.fullName || prev.fullName,
              nickname: data.nickname || '',
              gender: data.gender || '',
              birthday: data.birthday || '',
              homeAddress: data.homeAddress || '',
              workAddress: data.workAddress || '',
              frequentLocations: data.frequentLocations || [],
              workingHours: data.workingHours || { start: '', end: '' },
              aiPersonality: data.aiPersonality || 'FRIENDLY',
              responseLength: data.responseLength || 'DETAILED',
              nudgePermission: data.nudgePermission !== undefined ? data.nudgePermission : true
            }));
          })
          .catch(error => {
            console.log('No existing profile found, starting fresh');
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      window.location.href = '/signin';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    
    setSaving(true);
    
    try {
      const response = await fetch('/api/user-profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          profile: formData
        }),
      });

      if (response.ok) {
        alert('Profile saved successfully!');
        setProfile(formData);
      } else {
        throw new Error('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Please sign in to view your profile.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">👤 Your Profile</h1>
        <div className="flex gap-2">
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Dashboard
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/';
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Personal Information</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Nickname</label>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                  placeholder="What should I call you?"
                />
              </div>
              
              
              <div>
                <label className="block text-white mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white mb-2">Birthday</label>
                <input
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => handleInputChange('birthday', e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* AI Preferences */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">AI Assistant Preferences</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">AI Personality</label>
                <select
                  value={formData.aiPersonality}
                  onChange={(e) => handleInputChange('aiPersonality', e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                >
                  <option value="FRIENDLY">Friendly</option>
                  <option value="PROFESSIONAL">Professional</option>
                  <option value="CASUAL">Casual</option>
                  <option value="FORMAL">Formal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white mb-2">Response Length</label>
                <select
                  value={formData.responseLength}
                  onChange={(e) => handleInputChange('responseLength', e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                >
                  <option value="SHORT">Short</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="DETAILED">Detailed</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.nudgePermission}
                  onChange={(e) => handleInputChange('nudgePermission', e.target.checked)}
                  className="rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-white">Allow RajniAI to send helpful nudges and reminders</span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={saving}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 