import { NextRequest, NextResponse } from 'next/server';
import { submitSurveyResponse } from '@/lib/supabase';
import { surveySchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check (basic)
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    console.log('📥 Request from:', { userAgent, ip: ip.split(',')[0] });

    const body = await request.json();

    console.log('📥 Received survey data:', {
      // Don't log sensitive data in production
      dataKeys: Object.keys(body),
      timestamp: new Date().toISOString(),
    });

    // Validate the data
    const validatedData = surveySchema.parse(body);

    console.log('✅ Validation passed');

    // Submit to Supabase
    const response = await submitSurveyResponse(validatedData);

    return NextResponse.json(
      { success: true, data: response },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('❌ Survey submission error:', error);

    // Check for Supabase configuration error
    if (
      error instanceof Error &&
      error.message.includes('SUPABASE NOT CONFIGURED')
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Database not configured',
          message:
            'Please set up Supabase credentials in .env.local file. See SETUP_SUPABASE.md for instructions.',
        },
        { status: 503 }
      );
    }

    if (
      error &&
      typeof error === 'object' &&
      'name' in error &&
      error.name === 'ZodError'
    ) {
      const zodErrors = 'errors' in error ? error.errors : [];
      console.error('🔍 Validation errors:', zodErrors);

      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: zodErrors,
        },
        { status: 400 }
      );
    }

    // Supabase errors
    if (error && typeof error === 'object' && 'message' in error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Database error',
          message: String((error as { message: unknown }).message),
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to submit survey' },
      { status: 500 }
    );
  }
}
