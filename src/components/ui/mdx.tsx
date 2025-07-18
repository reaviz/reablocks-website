"use client";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { useEffect, useState, useMemo, Fragment } from "react";
import { MDXProvider } from "@mdx-js/react";
import type { ComponentPropsWithoutRef } from "react";

export default function Mdx({ children }: { children: string }) {
  const [MDXContent, setMDXContent] = useState<React.FC | null>(null);
  
  const customComponents = useMemo(() => ({
    h1: (props: ComponentPropsWithoutRef<"h1">) => <h1 className="mb-4 mt-6 text-3xl font-bold" {...props} />,
    h2: (props: ComponentPropsWithoutRef<"h2">) => (
      <h2 className="mb-3 mt-5 text-2xl font-semibold" {...props} />
    ),
    h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 className="mb-2 mt-4 text-xl font-medium" {...props} />,
    p: (props: ComponentPropsWithoutRef<"p">) => (
      <p className="mb-4 mt-2 text-base leading-relaxed" {...props} />
    ),
    ul: (props: ComponentPropsWithoutRef<"ul">) => <ul className="mb-4 mt-2 list-disc pl-5" {...props} />,
    ol: (props: ComponentPropsWithoutRef<"ol">) => <ol className="mb-4 mt-2 list-decimal pl-5" {...props} />,
    a: (props: ComponentPropsWithoutRef<"a">) => <a className="text-blue-500 hover:underline" {...props} />,
    code: (props: ComponentPropsWithoutRef<"code">) => (
      <code
        className="rounded bg-gray-200 px-1 py-0.5 text-sm dark:bg-gray-700"
        {...props}
      />
    ),
    pre: (props: ComponentPropsWithoutRef<"pre">) => (
      <pre
        className="my-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-white"
        {...props}
      />
    ),
  }), []);

  useEffect(() => {
    async function compile() {
      try {
        const { default: Content } = await evaluate(children, {
          jsx: (runtime as any).jsx,
          jsxs: (runtime as any).jsxs,
          Fragment,
          format: "mdx",
          development: false,
          useMDXComponents: () => customComponents,
        });
        setMDXContent(() => Content);
      } catch (error) {
        console.error("MDX Compilation Error:", error);
      }
    }
    compile();
  }, [children, customComponents]);

  if (!MDXContent) return <p>Loading...</p>;

  return (
    <MDXProvider components={customComponents}>
      <div className="prose prose-lg dark:prose-invert">
        <MDXContent />
      </div>
    </MDXProvider>
  );
}
