import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    console.log('Synthesizing text:', text.substring(0, 50) + '...');

    // Convert text to speech using OpenAI TTS
    console.log('Calling OpenAI TTS...');
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'TTS not configured. Set OPENAI_API_KEY.' }, { status: 500 })
    }
    const openai = new OpenAI({ apiKey });
    const speech = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
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