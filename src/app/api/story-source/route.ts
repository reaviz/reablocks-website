import { NextRequest } from "next/server";
import { getStorySource } from 'reablocks-docs-theme'

export async function GET (request: NextRequest) {
  return getStorySource(request);
}
