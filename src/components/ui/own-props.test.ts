import { describe, expect, it } from 'vitest';
import { getOwnPropertyNames } from './own-props';

describe('getOwnPropertyNames', () => {
  it('returns own properties for a type that does not extend a base type', () => {
    const code = `export { ArrowProps as default } from 'reablocks';`;
    const own = getOwnPropertyNames({ code });

    expect(own).toEqual(new Set(['className', 'direction', 'theme']));
  });

  it('filters out properties inherited from React.HTMLAttributes', () => {
    const code = `export { AvatarGroupProps as default } from 'reablocks';`;
    const own = getOwnPropertyNames({ code });

    // Declared on AvatarGroupProps itself
    expect(own.has('children')).toBe(true);
    expect(own.has('className')).toBe(true);
    expect(own.has('size')).toBe(true);
    expect(own.has('theme')).toBe(true);

    // Inherited from React.HTMLAttributes — must be excluded
    expect(own.has('onClick')).toBe(false);
    expect(own.has('id')).toBe(false);
    expect(own.has('style')).toBe(false);
    expect(own.has('role')).toBe(false);
    expect(own.has('tabIndex')).toBe(false);
  });

  it('respects a custom exportName', () => {
    const code = `export { ArrowProps } from 'reablocks';`;
    const own = getOwnPropertyNames({ code, exportName: 'ArrowProps' });

    expect(own).toEqual(new Set(['className', 'direction', 'theme']));
  });

  it('throws when the requested export does not exist', () => {
    const code = `export { ArrowProps } from 'reablocks';`;

    expect(() => getOwnPropertyNames({ code })).toThrow(
      /Can't find "default" declaration/
    );
  });

  it('throws with the export name embedded in the error message', () => {
    const code = `export { ArrowProps as default } from 'reablocks';`;

    expect(() =>
      getOwnPropertyNames({ code, exportName: 'NotARealExport' })
    ).toThrow(/Can't find "NotARealExport" declaration/);
  });
});
