const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

import type { Config } from "tailwindcss";

const colorPallete = {
  blue: {
    100: "#E7EFFF",
    200: "#C3D7FF",
    300: "#87AEFF",
    400: "#4C86FF",
    500: "#105EFF",
    600: "#0D4ED2",
    700: "#0A3DA6",
    800: "#082D79",
    900: "#051C4C",
    950: "#041028",
  },
};

const config: Config = {
  darkMode: "class",
  prefix: "",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/reablocks/**/*.{js,jsx,ts,tsx}",
    "./theme.config.tsx",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      fontSize: {
        sm: ["0.75rem", "1rem"], // 12px
        base: ["0.875rem", "1.25rem"], // 14px
        lg: ["1rem", "1.5rem"], // 16px
      },
      colors: {
        ...colorPallete,
        primary: {
          DEFAULT: "#105EFF",
          hover: "#4C86FF",
        },
        secondary: {
          DEFAULT: "#87AEFF",
        },
        content: {
          primary: "#F2F3F7",
          secondary: "#C6CBD9",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        button: "0px 4px 16px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
