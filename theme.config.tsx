import { Pre, Code } from 'nextra/components'
import { useRouter } from 'next/router';
import { DocsThemeConfig } from 'nextra-theme-docs'

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
    code: props => <Code {...props} className={`${props.className} rb-code`} />,
    // Handle storybook overrides
    pre: props => <Pre {...props} className={`${props.className} prismjs`} />,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  // hide the button
  darkMode: false,
  footer: {
    text: (
      <span>
        Apache-2.0 {new Date().getFullYear()} ©{' '}
        <a href="https://goodcode.us" target="_blank">
          Good Code
        </a>
        .
      </span>
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

    if (asPath !== '/') {
      return {
        titleTemplate: '%s \u2013 reablocks',
      };
    } else {
      return {
        titleTemplate: 'reablocks \u2013 Enterprise React Components',
      };
    }
  },
};

export default config;
