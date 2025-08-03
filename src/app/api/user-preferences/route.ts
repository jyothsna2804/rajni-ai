import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Convert frontend field names to database column names (snake_case)
function convertToDatabaseFields(preferences: any) {
  return {
    // Food & Grocery Preferences
    grocery_brands: Array.isArray(preferences.groceryBrands) ? preferences.groceryBrands : [],
    grocery_apps: Array.isArray(preferences.groceryApps) ? preferences.groceryApps : [],
    food_apps: Array.isArray(preferences.foodApps) ? preferences.foodApps : [],
    preferred_cuisines: Array.isArray(preferences.preferredCuisines) ? preferences.preferredCuisines : [],
    delivery_time_preference: preferences.deliveryTimePreference || '',
    go_to_restaurants: Array.isArray(preferences.goToRestaurants) ? preferences.goToRestaurants : [],
    usual_meal_times: typeof preferences.usualMealTimes === 'object' ? preferences.usualMealTimes : {},
    is_vegetarian: Boolean(preferences.isVegetarian),
    spice_tolerance_level: preferences.spiceToleranceLevel || '',
    
    // Travel Preferences
    frequent_flight_routes: Array.isArray(preferences.frequentFlightRoutes) ? preferences.frequentFlightRoutes : [],
    flight_booking_sites: Array.isArray(preferences.flightBookingSites) ? preferences.flightBookingSites : [],
    flight_preferences: typeof preferences.flightPreferences === 'object' ? preferences.flightPreferences : {},
    cab_services: Array.isArray(preferences.cabServices) ? preferences.cabServices : [],
    cab_type_preference: preferences.cabTypePreference || '',
    
    // Shopping Preferences
    product_categories: Array.isArray(preferences.productCategories) ? preferences.productCategories : [],
    favorite_brands: Array.isArray(preferences.favoriteBrands) ? preferences.favoriteBrands : [],
    ecommerce_sites: Array.isArray(preferences.ecommerceSites) ? preferences.ecommerceSites : [],
    monthly_shopping_budget: preferences.monthlyShoppingBudget || '',
    preferred_payment_method: preferences.preferredPaymentMethod || '',
    payment_methods: Array.isArray(preferences.paymentMethods) ? preferences.paymentMethods : [],
    spending_limits: typeof preferences.spendingLimits === 'object' ? preferences.spendingLimits : {},
    
    // Location Preferences
    home_location: preferences.homeLocation || '',
    work_location: preferences.workLocation || '',
    
    // Work Preferences
    calendar_app: preferences.calendarApp || '',
    working_hours: typeof preferences.workingHours === 'object' ? preferences.workingHours : {}
  };
}

// Convert database field names back to frontend format (camelCase)
function convertFromDatabaseFields(preferences: any) {
  return {
    // Food & Grocery Preferences
    groceryBrands: preferences.grocery_brands || [],
    groceryApps: preferences.grocery_apps || [],
    foodApps: preferences.food_apps || [],
    preferredCuisines: preferences.preferred_cuisines || [],
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
    workingHours: preferences.working_hours || {}
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, preferences } = body;
    
    // Enhanced validation
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (!preferences || typeof preferences !== 'object') {
      return NextResponse.json(
        { error: 'Preferences object is required' },
        { status: 400 }
      );
    }

    console.log('Saving preferences for user:', userId);
    console.log('Preferences:', preferences);

    // Convert to database format with proper validation
    const dbPreferences = convertToDatabaseFields(preferences);
    console.log('Converted preferences:', dbPreferences);

    // Save to Supabase with better error handling
    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        ...dbPreferences,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })
      .select();

    if (error) {
      console.error('Error saving user preferences:', error);
      return NextResponse.json(
        { 
          error: 'Failed to save preferences', 
          details: error.message,
          code: error.code 
        },
        { status: 500 }
      );
    }

    console.log('Successfully saved preferences:', data);
    return NextResponse.json(
      { 
        message: 'Preferences saved successfully', 
        data: data?.[0] ? convertFromDatabaseFields(data[0]) : null 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error in user preferences POST API:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error.message 
      },
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

    console.log('Fetching preferences for user:', userId);

    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows found
        return NextResponse.json(
          { message: 'No preferences found for this user' },
          { status: 404 }
        );
      }
      
      console.error('Error fetching user preferences:', error);
      return NextResponse.json(
        { 
          error: 'Failed to fetch preferences', 
          details: error.message 
        },
        { status: 500 }
      );
    }

    // Convert to frontend format
    const frontendPreferences = convertFromDatabaseFields(data);
    
    return NextResponse.json(frontendPreferences, { status: 200 });

  } catch (error: any) {
    console.error('Error in user preferences GET API:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error.message 
      },
      { status: 500 }
    );
  }
} 