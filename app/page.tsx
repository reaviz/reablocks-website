import type { Metadata } from "next";
import Home from "./_components/layout/home";
import type { FC } from "react";

export const metadata: Metadata = {
  description:
    "Build fast, customizable, and content-rich websites with Nextra. Powered by Next.js, it offers seamless Markdown support, customizable themes, file conventions, and easy integration with MDX, making it perfect for documentation, blogs, and static websites.",
};

const IndexPage: FC = () => {
  return <Home />;
};

export default IndexPage;
