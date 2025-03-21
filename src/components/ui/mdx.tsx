import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { MDXProvider } from "@mdx-js/react";

export default function Mdx({ children }: { children: string }) {
  const [MDXContent, setMDXContent] = useState<React.FC | null>(null);
  const customComponents = {
    h1: (props) => <h1 className="mb-4 mt-6 text-3xl font-bold" {...props} />,
    h2: (props) => (
      <h2 className="mb-3 mt-5 text-2xl font-semibold" {...props} />
    ),
    h3: (props) => <h3 className="mb-2 mt-4 text-xl font-medium" {...props} />,
    p: (props) => (
      <p className="mb-4 mt-2 text-base leading-relaxed" {...props} />
    ),
    ul: (props) => <ul className="mb-4 mt-2 list-disc pl-5" {...props} />,
    ol: (props) => <ol className="mb-4 mt-2 list-decimal pl-5" {...props} />,
    a: (props) => <a className="text-blue-500 hover:underline" {...props} />,
    code: (props) => (
      <code
        className="rounded bg-gray-200 px-1 py-0.5 text-sm dark:bg-gray-700"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="my-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-white"
        {...props}
      />
    ),
  };

  useEffect(() => {
    async function compile() {
      try {
        const { default: Content } = await evaluate(children, {
          ...runtime,
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
