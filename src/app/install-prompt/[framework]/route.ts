import { buildInstallPrompt } from '@/components/ui/install-prompt/build-prompt';
import { getRecipe } from '@/components/ui/install-prompt/recipes';

export const runtime = 'edge';

// Serves the framework-specific install prompt as raw Markdown so AI agents
// (and the "View as Markdown" button) can fetch it by URL: /install-prompt/next
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ framework: string }> }
) {
  const { framework } = await params;
  const recipe = getRecipe(framework);

  if (!recipe) {
    return new Response(`Unknown framework: ${framework}`, {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=utf-8' }
    });
  }

  return new Response(buildInstallPrompt(recipe), {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=3600'
    }
  });
}
