import {
  TypographyBlocks,
  ColorBlocks,
  SpacingBlocks,
  BorderBlocks,
  ShadowBlocks,
  ThemeProvider,
  theme,
  useTheme,
  extractTheme
} from 'reablocks';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config';

const { theme: TWConfig } = resolveConfig(tailwindConfig);

const {
  colors,
  borderRadius,
  boxShadow,
  spacing,
  fontFamily,
  fontSize,
  fontWeight
} = extractTheme(TWConfig);

export const ColorBlocksExample = () => (
  <div className="p-5 border border-gray-700 rounded-sm mt-3">
    <ColorBlocks colors={colors} />
  </div>
);

export const TypographyBlocksExample = () => (
  <div className="p-5 border border-gray-700 rounded-sm mt-3">
    <TypographyBlocks
      families={fontFamily}
      sizes={fontSize}
      weights={fontWeight}
    />
  </div>
);

export const SpacingBlocksExample = () => (
  <div className="p-5 border border-gray-700 rounded-sm mt-3">
    <SpacingBlocks spacings={spacing} />
  </div>
);

export const BorderBlocksExample = () => (
  <div className="p-5 border border-gray-700 rounded-sm mt-3">
    <BorderBlocks borders={borderRadius} />
  </div>
);

export const Shadows = () => <ShadowBlocks shadows={boxShadow} />;