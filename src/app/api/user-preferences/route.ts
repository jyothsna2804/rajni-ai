import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Convert frontend field names to database column names (snake_case)
function convertToDatabaseFields(preferences: any) {
  return {
    // Food & Grocery Preferences
    grocery_brands: preferences.groceryBrands || [],
    delivery_time_preference: preferences.deliveryTimePreference || '',
    go_to_restaurants: preferences.goToRestaurants || [],
    usual_meal_times: preferences.usualMealTimes || {},
    is_vegetarian: preferences.isVegetarian || false,
    spice_tolerance_level: preferences.spiceToleranceLevel || '',
    
    // Travel Preferences
    frequent_flight_routes: preferences.frequentFlightRoutes || [],
    flight_booking_sites: preferences.flightBookingSites || [],
    flight_preferences: preferences.flightPreferences || {},
    cab_services: preferences.cabServices || [],
    cab_type_preference: preferences.cabTypePreference || '',
    
    // Shopping Preferences
    product_categories: preferences.productCategories || [],
    favorite_brands: preferences.favoriteBrands || [],
    ecommerce_sites: preferences.ecommerceSites || [],
    monthly_shopping_budget: preferences.monthlyShoppingBudget || '',
    preferred_payment_method: preferences.preferredPaymentMethod || '',
    payment_methods: preferences.paymentMethods || [],
    spending_limits: preferences.spendingLimits || {},
    
    // Location Preferences
    home_location: preferences.homeLocation || '',
    work_location: preferences.workLocation || '',
    
    // Work Preferences
    calendar_app: preferences.calendarApp || '',
    working_hours: preferences.workingHours || {},
    
    // Legacy fields (for backward compatibility)
    grocery_apps: preferences.groceryApps || [],
    food_apps: preferences.foodApps || [],
    preferred_cuisines: preferences.preferredCuisines || [],
    
    // AI Behavior Preferences (kept in user_preferences for now for compatibility)
    ai_personality: preferences.aiPersonality || 'FRIENDLY',
    response_length: preferences.responseLength || 'DETAILED',
    budget_level: preferences.budgetLevel || 'MEDIUM'
  };
}

// Convert database field names back to frontend format (camelCase)
function convertFromDatabaseFields(preferences: any) {
  return {
    // Food & Grocery Preferences
    groceryBrands: preferences.grocery_brands || [],
    deliveryTimePreference: preferences.delivery_time_preference || '',
    goToRestaurants: preferences.go_to_restaurants || [],
    usualMealTimes: preferences.usual_meal_times || {},
    isVegetarian: preferences.is_vegetarian || false,
    spiceToleranceLevel: preferences.spice_tolerance_level || '',
    
    // Travel Preferences
    frequentFlightRoutes: preferences.frequent_flight_routes || [],
    flightBookingSites: preferences.flight_booking_sites || [],
    flightPreferences: preferences.flight_preferences || {},
    cabServices: preferences.cab_services || [],
    cabTypePreference: preferences.cab_type_preference || '',
    
    // Shopping Preferences
    productCategories: preferences.product_categories || [],
    favoriteBrands: preferences.favorite_brands || [],
    ecommerceSites: preferences.ecommerce_sites || [],
    monthlyShoppingBudget: preferences.monthly_shopping_budget || '',
    preferredPaymentMethod: preferences.preferred_payment_method || '',
    paymentMethods: preferences.payment_methods || [],
    spendingLimits: preferences.spending_limits || {},
    
    // Location Preferences
    homeLocation: preferences.home_location || '',
    workLocation: preferences.work_location || '',
    
    // Work Preferences
    calendarApp: preferences.calendar_app || '',
    workingHours: preferences.working_hours || {},
    
    // Legacy fields (for backward compatibility)
    groceryApps: preferences.grocery_apps || [],
    foodApps: preferences.food_apps || [],
    preferredCuisines: preferences.preferred_cuisines || [],
    
    // AI Behavior Preferences (kept in user_preferences for now for compatibility)
    aiPersonality: preferences.ai_personality || 'FRIENDLY',
    responseLength: preferences.response_length || 'DETAILED',
    budgetLevel: preferences.budget_level || 'MEDIUM'
  };
}

export async function POST(request: NextRequest) {
  try {
    const { userId, preferences } = await request.json();
    
    if (!userId || !preferences) {
      return NextResponse.json(
        { error: 'User ID and preferences are required' },
        { status: 400 }
      );
    }

    console.log('Saving preferences for user:', userId);
    console.log('Preferences:', preferences);

    // Convert to database format
    const dbPreferences = convertToDatabaseFields(preferences);
    console.log('Converted preferences:', dbPreferences);

    // Save to Supabase
    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        ...dbPreferences
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      console.error('Error saving user preferences:', error);
      return NextResponse.json(
        { error: 'Failed to save preferences', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error saving user preferences:', error);
    return NextResponse.json(
      { error: 'Failed to save preferences', details: error },
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
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Preferences not found' },
          { status: 404 }
        );
      }
      console.error('Error fetching user preferences:', error);
      return NextResponse.json(
        { error: 'Failed to fetch preferences', details: error },
        { status: 500 }
      );
    }

    // Convert from database format
    const frontendPreferences = convertFromDatabaseFields(data);
    return NextResponse.json(frontendPreferences);
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch preferences', details: error },
      { status: 500 }
    );
  }
} 