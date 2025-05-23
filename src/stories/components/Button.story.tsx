import { Button } from 'reablocks';
import {
  extendTheme,
  PartialReablocksTheme
} from 'reablocks';
import { ThemeProvider } from 'reablocks';
import { theme } from 'reablocks';

export default {
  title: 'Components/Elements/Button',
  component: Button
};

export const Variants = () => (
  <div style={{ display: 'flex', gap: 10 }}>
    <Button variant="filled">Filled</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="text">Text</Button>
  </div>
);

export const Colors = () => (
  <div className="light:bg-white p-24" style={{ display: 'flex', gap: 10 }}>
    <Button>Default</Button>
    <Button color="primary">Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button color="success">Success</Button>
    <Button color="warning">Warning</Button>
    <Button color="error">Error</Button>
    <Button disabled>Disabled</Button>
  </div>
);

export const TextColors = () => (
  <div style={{ display: 'flex', gap: 10 }}>
    <Button variant="text">Default</Button>
    <Button variant="text" color="primary">
      Primary
    </Button>
    <Button variant="text" color="secondary">
      Secondary
    </Button>
    <Button variant="text" color="success">
      Success
    </Button>
    <Button variant="text" color="warning">
      Warning
    </Button>
    <Button variant="text" color="error">
      Error
    </Button>
    <Button variant="text" disabled>
      Disabled
    </Button>
  </div>
);

export const Disabled = () => (
  <div style={{ display: 'flex', gap: 10 }}>
    <Button variant="filled" disabled>
      Filled
    </Button>
    <Button variant="outline" disabled>
      Outline
    </Button>
    <Button variant="text" disabled>
      Text
    </Button>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
    <Button size="large">Large</Button>
  </div>
);

export const FullWidth = () => (
  <div
    style={{ display: 'flex', width: '400px', alignItems: 'center', gap: 10 }}
  >
    <Button fullWidth>Full Width</Button>
  </div>
);

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="white"
    viewBox="0 0 16 16"
  >
    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
  </svg>
);

export const WithIcon = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <Button size="small" startAdornment={<BellIcon />}>
      Start Icon
    </Button>
    <Button size="small" endAdornment={<BellIcon />}>
      End Icon
    </Button>
    <Button size="medium" startAdornment={<BellIcon />}>
      Start Icon
    </Button>
    <Button size="medium" endAdornment={<BellIcon />}>
      End Icon
    </Button>
    <Button size="large" startAdornment={<BellIcon />}>
      Start Icon
    </Button>
    <Button size="large" endAdornment={<BellIcon />}>
      End Icon
    </Button>
  </div>
);

export const CustomTheme = () => {
  const customTheme: PartialReablocksTheme = {
    components: {
      button: {
        base: 'bg-lime-600 text-gray-300',
        sizes: {
          small: 'p-2',
          medium: 'p-3',
          large: 'p-4'
        },
        colors: {
          default: {
            filled: 'bg-lime-600 hover:bg-lime-700',
            outline: 'border-lime-600',
            text: 'text-gray-300'
          }
        }
      }
    }
  };

  return (
    <ThemeProvider theme={extendTheme(theme, customTheme)}>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button variant="filled">Filled</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="text">Text</Button>
      </div>
      <br />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </div>
    </ThemeProvider>
  );
};

export const CustomColor = () => {
  const customTheme: PartialReablocksTheme = {
    components: {
      button: {
        colors: {
          gradient: {
            filled: 'bg-linear-to-r from-cyan-500 to-blue-500'
          }
        }
      }
    }
  };

  return (
    <ThemeProvider theme={extendTheme(theme, customTheme)}>
      <Button color="gradient">Gradient</Button>
    </ThemeProvider>
  );
};

export const CustomVariant = () => {
  const customTheme: PartialReablocksTheme = {
    components: {
      button: {
        variants: {
          gradient: 'border rounded-lg'
        },
        colors: {
          default: {
            gradient: 'bg-linear-to-r from-cyan-500 to-blue-500 border-blue-500'
          },
          primary: {
            gradient:
              'bg-linear-to-r from-violet-500 to-fuchsia-500 border-violet-500'
          }
        }
      }
    }
  };

  return (
    <ThemeProvider theme={extendTheme(theme, customTheme)}>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button variant="gradient">Gradient - Default</Button>
        <Button variant="gradient" color="primary">
          Gradient - Primary
        </Button>
      </div>
    </ThemeProvider>
  );
};

export const CustomSize = () => {
  const customTheme: PartialReablocksTheme = {
    components: {
      button: {
        sizes: {
          xsmall: 'text-xs px-1 py-0.5',
          xlarge: 'text-2xl px-6 py-3'
        }
      }
    }
  };

  return (
    <ThemeProvider theme={extendTheme(theme, customTheme)}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Button size="xsmall">xsmall</Button>
        <Button size="xlarge">xlarge</Button>
      </div>
    </ThemeProvider>
  );
};
