import { Pre, Code } from "nextra/components";
import { useRouter } from "next/router";
import { DocsThemeConfig } from "nextra-theme-docs";
import Link from 'next/link';

// eslint-disable-next-line import/no-anonymous-default-export
const config: DocsThemeConfig = {
  logo: (
    <img
      style={{ width: 150 }}
      alt="Logo"
      src="https://github.com/reaviz/reablocks/raw/master/docs/assets/logo.png"
    />
  ),
  components: {
    // Handle storybook overrides
    code: (props: any) => (
      <Code {...props} className={`${props.className} rb-code`} />
    ),
    // Handle storybook overrides
    pre: (props: any) => (
      <Pre {...props} className={`${props.className} prismjs`} />
    ),
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  footer: {
    component: (
      <footer className="block self-center pb-4 pt-10 text-center">
        <span>
          Made with ❤️ by{" "}
          <Link
            className="text-secondary underline"
            href="https://goodcode.us"
          >
            Good Code
          </Link>
        </span>
      </footer>
    )
  },
  feedback: {
    content: null
  },
  project: {
    link: 'https://github.com/reaviz/reablocks'
  },
  docsRepositoryBase: 'https://github.com/reaviz/reablocks/tree/master/docs',
  useNextSeoProps: () => {
    const { asPath } = useRouter();

    if (asPath !== "/") {
      return {
        titleTemplate: "%s \u2013 Reablocks",
        description:
          "Beautifully designed, highly customizable, Open Source React components based on Tailwind and Framer Motion.",
      };
    } else {
      return {
        titleTemplate: "Reablocks \u2013 Open Source ReactJS Component Library",
        description:
          "Beautifully designed, highly customizable, Open Source React components based on Tailwind and Framer Motion.",
      };
    }
  },
};

export default config;
