import { evaluateSync } from "@mdx-js/mdx";
import * as provider from "@mdx-js/react";
import { useMDXComponents } from "nextra/mdx";
import * as runtime from "react/jsx-runtime";

export default function Mdx({ children }: any) {
  const { default: MDXContent } = evaluateSync(children, {
    ...runtime,
    ...provider,
    useMDXComponents,
    format: "mdx",
    development: false,
  } as any);

  return <MDXContent />;
}