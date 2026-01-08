import { docs } from '@/lib/source';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import type { ComponentType } from 'react';
import type { TableOfContents } from 'fumadocs-core/server';

interface PageData {
  title: string;
  description?: string;
  body: ComponentType;
  toc: TableOfContents;
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = docs.getPage(params.slug);
  if (!page) notFound();

  const data = page.data as PageData;
  const MDX = data.body;

  return (
    <DocsPage toc={data.toc}>
      <DocsBody>
        <h1>{data.title}</h1>
        <MDX />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return docs.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = docs.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
