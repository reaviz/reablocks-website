import { NextRequest, NextResponse } from "next/server";
import storySources from '@/generated/story-sources.json';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const storyPath = searchParams.get('storyPath') ?? '';
  const functionName = searchParams.get('functionName') ?? '';

  const key = `${storyPath}:${functionName}`;
  const source = (storySources as Record<string, string>)[key];

  if (!source) {
    return NextResponse.json(
      { error: 'Story source not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ source });
}
