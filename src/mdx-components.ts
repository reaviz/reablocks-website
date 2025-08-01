import { useMDXComponents as getDocsMDXComponents } from 'reablocks-docs-theme'

const docsComponents = getDocsMDXComponents()

export const useMDXComponents: typeof getDocsMDXComponents = components => ({
  ...docsComponents,
  ...components
})
