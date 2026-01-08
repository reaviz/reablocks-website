import { blocks } from '@/lib/source';
import { notFound } from 'next/navigation';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = blocks.getPage(params.slug);
  if (!page) notFound();

  return (
    <div>
      <h1>{String(page.data.title)}</h1>
    </div>
  );
}

export async function generateStaticParams() {
  return blocks.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = blocks.getPage(params.slug);
  if (!page) notFound();

  return {
    title: String(page.data.title),
  };
}
