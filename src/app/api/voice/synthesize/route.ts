import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    console.log('Synthesizing text:', text.substring(0, 50) + '...');

    // Convert text to speech using OpenAI TTS
    console.log('Calling OpenAI TTS...');
    const speech = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy', // You can change this to 'echo', 'fable', 'onyx', or 'nova'
      input: text,
    });

    console.log('TTS response received');

    // Convert the response to a buffer
    const buffer = Buffer.from(await speech.arrayBuffer());
    console.log('Buffer created, size:', buffer.length);

    // Return the audio as a blob
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('TTS error:', error);
    return NextResponse.json(
      { error: 'Failed to synthesize speech', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 