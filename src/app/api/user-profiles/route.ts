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

    // Save to Supabase (only fields that exist in the database schema)
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        full_name: profile.fullName || '',
        nickname: profile.nickname || '',
        gender: profile.gender || '',
        birthday: profile.birthday || null,
        home_address: profile.homeAddress || '',
        work_address: profile.workAddress || '',
        frequent_locations: Array.isArray(profile.frequentLocations) ? profile.frequentLocations : [],
        working_hours: typeof profile.workingHours === 'object' ? profile.workingHours : {},
        ai_personality: profile.aiPersonality || 'FRIENDLY',
        response_length: profile.responseLength || 'DETAILED',
        nudge_permission: Boolean(profile.nudgePermission),
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

    // Convert to frontend format (only fields that exist in database)
    const profile = {
      fullName: data.full_name || '',
      nickname: data.nickname || '',
      gender: data.gender || '',
      birthday: data.birthday || '',
      homeAddress: data.home_address || '',
      workAddress: data.work_address || '',
      frequentLocations: data.frequent_locations || [],
      workingHours: data.working_hours || {},
      aiPersonality: data.ai_personality || 'FRIENDLY',
      responseLength: data.response_length || 'DETAILED',
      nudgePermission: data.nudge_permission !== undefined ? data.nudge_permission : true
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