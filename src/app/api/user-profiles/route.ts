import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { userId, profile } = await request.json();
    
    if (!userId || !profile) {
      return NextResponse.json(
        { error: 'User ID and profile are required' },
        { status: 400 }
      );
    }

    console.log('Saving profile for user:', userId);
    console.log('Profile:', profile);

    // Save to Supabase
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        full_name: profile.fullName,
        nickname: profile.nickname,
        email: profile.email,
        gender: profile.gender,
        birthday: profile.birthday,
        home_address: profile.homeAddress,
        work_address: profile.workAddress,
        frequent_locations: profile.frequentLocations,
        working_hours: profile.workingHours,
        ai_personality: profile.aiPersonality,
        response_length: profile.responseLength,
        budget_level: profile.budgetLevel,
        nudge_permission: profile.nudgePermission,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      console.error('Error saving user profile:', error);
      return NextResponse.json(
        { error: 'Failed to save profile', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error saving user profile:', error);
    return NextResponse.json(
      { error: 'Failed to save profile', details: error },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get from Supabase
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Profile not found' },
          { status: 404 }
        );
      }
      console.error('Error fetching user profile:', error);
      return NextResponse.json(
        { error: 'Failed to fetch profile', details: error },
        { status: 500 }
      );
    }

    // Convert to frontend format
    const profile = {
      fullName: data.full_name,
      nickname: data.nickname,
      email: data.email,
      gender: data.gender,
      birthday: data.birthday,
      homeAddress: data.home_address,
      workAddress: data.work_address,
      frequentLocations: data.frequent_locations,
      workingHours: data.working_hours,
      aiPersonality: data.ai_personality,
      responseLength: data.response_length,
      budgetLevel: data.budget_level,
      nudgePermission: data.nudge_permission
    };

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile', details: error },
      { status: 500 }
    );
  }
} 