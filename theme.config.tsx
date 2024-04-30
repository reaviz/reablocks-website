// eslint-disable-next-line import/no-anonymous-default-export
export default {
  logo: (
    <img
      style={{ width: 150 }}
      alt="Logo"
      src="https://github.com/reaviz/reablocks/raw/master/docs/assets/logo.png"
    />
  ),
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  // hide the button
  darkMode: false,
  footer: {
    text: (
      <span>
        Apache {new Date().getFullYear()} ©{' '}
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
  docsRepositoryBase: 'https://github.com/reaviz/reablocks/tree/master/docs'
};
