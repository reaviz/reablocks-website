import { NextRequest } from "next/server";
import { getStorySource } from 'reablocks-docs-theme';
import { join } from 'path';

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const storyPath = searchParams.get('storyPath') ?? '';
  const functionName = searchParams.get('functionName') ?? '';
  const filePath = join(process.cwd(), 'src', 'stories', storyPath);

  return getStorySource(filePath, functionName);
}
