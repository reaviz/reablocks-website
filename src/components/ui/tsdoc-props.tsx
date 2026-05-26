import { generateDefinition, TSDoc } from 'nextra/tsdoc';
import { getOwnPropertyNames } from './own-props';

interface TSDocPropsProps {
  /**
   * Component name (without the `Props` suffix). Resolves to
   * `${name}Props` exported from `reablocks`.
   */
  name: string;
  /**
   * Override the resolved type name. Defaults to `${name}Props`.
   */
  typeName?: string;
  /**
   * Resolve props via `React.ComponentProps<typeof name>` instead of the
   * `${name}Props` re-export. Use for components whose props interface is
   * declared but not exported from `reablocks`.
   */
  fromComponent?: boolean;
  /**
   * Include properties inherited from base types such as
   * `React.HTMLAttributes`. Defaults to `false`.
   */
  includeInherited?: boolean;
}

export const TSDocProps = ({
  name,
  typeName,
  fromComponent = false,
  includeInherited = false
}: TSDocPropsProps) => {
  const code = fromComponent
    ? `import { ${name} } from 'reablocks';
import type { ComponentProps } from 'react';
type _ResolvedProps = ComponentProps<typeof ${name}>;
export { _ResolvedProps as default };`
    : `export { ${typeName ?? `${name}Props`} as default } from 'reablocks'`;

  const definition = generateDefinition({ code });

  let resolvedDefinition = definition;
  if (!includeInherited && 'entries' in definition) {
    const ownNames = getOwnPropertyNames({ code });
    resolvedDefinition = {
      ...definition,
      entries: definition.entries.filter(entry => ownNames.has(entry.name))
    };
  }

  return (
    <div className="tsdoc-props">
      <TSDoc definition={resolvedDefinition} typeLinkMap={SAFE_TYPE_LINK_MAP} />
    </div>
  );
};

// Nextra's `linkify` does `typeLinkMap[chunk]` against a plain `{}`, so chunks
// matching Object.prototype methods (e.g. `toLocaleString`) resolve to a
// function and get passed as `<Link href>`, crashing RSC serialization.
const SAFE_TYPE_LINK_MAP = Object.create(null) as Record<string, string>;
