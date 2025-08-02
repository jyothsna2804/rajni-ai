import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabase } from '@/lib/supabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, conversation, userId } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    console.log('Processing message:', message);
    console.log('Conversation length:', conversation?.length || 0);
    console.log('User ID:', userId);

    // Debug: Log the conversation history
    if (conversation && conversation.length > 0) {
      console.log('Conversation history:');
      conversation.forEach((msg: any, index: number) => {
        console.log(`  ${index + 1}. ${msg.role}: ${msg.content.substring(0, 100)}...`);
      });
    } else {
      console.log('No conversation history provided');
    }

    // Get user preferences and profile if userId is provided
    let userPreferences = null;
    let userProfile = null;
    
    if (userId) {
      try {
        // Get user preferences
        const { data: preferences } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', userId)
          .single();

        // Get user profile for AI behavior preferences
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (preferences) {
          userPreferences = {
            // Food & Grocery Preferences
            groceryBrands: preferences.grocery_brands,
            groceryApps: preferences.grocery_apps,
            foodApps: preferences.food_apps,
            preferredCuisines: preferences.preferred_cuisines,
            deliveryTimePreference: preferences.delivery_time_preference,
            goToRestaurants: preferences.go_to_restaurants,
            usualMealTimes: preferences.usual_meal_times,
            isVegetarian: preferences.is_vegetarian,
            spiceToleranceLevel: preferences.spice_tolerance_level,
            
            // Travel Preferences
            frequentFlightRoutes: preferences.frequent_flight_routes,
            flightBookingSites: preferences.flight_booking_sites,
            flightPreferences: preferences.flight_preferences,
            cabServices: preferences.cab_services,
            cabTypePreference: preferences.cab_type_preference,
            
            // Shopping Preferences
            productCategories: preferences.product_categories,
            favoriteBrands: preferences.favorite_brands,
            ecommerceSites: preferences.ecommerce_sites,
            monthlyShoppingBudget: preferences.monthly_shopping_budget,
            preferredPaymentMethod: preferences.preferred_payment_method,
            paymentMethods: preferences.payment_methods,
            spendingLimits: preferences.spending_limits,
            
            // Location Preferences
            homeLocation: preferences.home_location,
            workLocation: preferences.work_location,
            
            // Work Preferences
            calendarApp: preferences.calendar_app,
            workingHours: preferences.working_hours
          };
        }

        if (profile) {
          userProfile = {
            // AI Behavior Preferences
            aiPersonality: profile.ai_personality,
            responseLength: profile.response_length,
            budgetLevel: profile.budget_level
          };
        }

        console.log('User preferences loaded:', userPreferences);
        console.log('User profile loaded:', userProfile);
      } catch (error) {
        console.log('No user preferences/profile found or error loading them');
      }
    }

    // Create personalized system prompt based on user preferences
    let systemPrompt = `You are RajniAI, a helpful and friendly personal AI assistant. You help users with:
- Scheduling and calendar management
- Booking cabs, restaurants, and services
- Drafting emails and messages
- Planning activities and trips
- Task management and reminders
- General questions and assistance

Be conversational, helpful, and proactive. Keep responses concise but informative. 
If you can't do something, suggest alternatives or ask for more details.

IMPORTANT CONTEXTUAL AWARENESS: You have access to the last 5 messages in the conversation. Always reference and build upon previous messages. If the user is following up on a previous request, acknowledge what was discussed before and continue from there. For example:
- If they mentioned booking a cab and now provide details, acknowledge the booking request
- If they asked for an email draft and now provide the subject, reference the email request
- If they're clarifying details from a previous message, show you remember the context

This ensures natural, contextual conversations.`;

    if (userPreferences) {
      systemPrompt += `\n\nUser Profile:
- Home: ${userPreferences.homeLocation || 'Not set'}
- Work: ${userPreferences.workLocation || 'Not set'}
- Preferred Cab Services: ${userPreferences.cabServices?.join(', ') || 'Not set'}
- Preferred Flight Booking Sites: ${userPreferences.flightBookingSites?.join(', ') || 'Not set'}
- Preferred Grocery Apps: ${userPreferences.groceryApps?.join(', ') || 'Not set'}
- Preferred Food Apps: ${userPreferences.foodApps?.join(', ') || 'Not set'}
- Preferred Cuisines: ${userPreferences.preferredCuisines?.join(', ') || 'Not set'}
- Payment Methods: ${userPreferences.paymentMethods?.join(', ') || 'Not set'}
- Budget Level: ${userPreferences.monthlyShoppingBudget || 'Not set'}

Use this information to provide personalized responses. If the user mentions booking a cab, suggest their preferred services. If they mention food delivery, suggest their preferred apps. If they mention flight booking, suggest their preferred sites.`;
    }

    // Create conversation context for GPT-3.5 Turbo with explicit 5-message memory limit
    const recentMessages = conversation ? conversation.slice(-5) : []; // Only last 5 messages
    const messages = [
      {
        role: 'system' as const,
        content: systemPrompt
      },
      ...recentMessages.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    console.log('Sending to OpenAI GPT-3.5 Turbo...');
    console.log('Total messages in context:', messages.length);
    console.log('Recent conversation (last 5 messages):', recentMessages.length);
    console.log('Messages being sent to AI:');
    messages.forEach((msg, index) => {
      console.log(`  ${index + 1}. ${msg.role}: ${msg.content.substring(0, 100)}...`);
    });

    // Get response from GPT-3.5 Turbo with improved settings (much cheaper than GPT-4)
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Changed from gpt-4 to gpt-3.5-turbo for cost savings
      messages: messages,
      max_tokens: 500, // Increased from 300
      temperature: 0.7,
      presence_penalty: 0.1, // Slightly encourage new topics
      frequency_penalty: 0.1, // Slightly reduce repetition
    });

    const response = completion.choices[0]?.message?.content || 'Sorry, I didn\'t understand that. Could you please repeat?';
    console.log('AI response:', response);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('AI processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process message', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 