'use client'
import { theme, ThemeProvider } from "reablocks";
import { FC, ReactNode, useEffect } from "react";
import root from "react-shadow";
import { useTheme } from "reablocks-docs-theme";

export type ShadowWrapperProps = {
  children: ReactNode;
};

export const ShadowWrapper: FC<ShadowWrapperProps> = ({ children }) => {
  const { setTheme, theme: nextraTheme } = useTheme();

  useEffect(() => {
    if (typeof document === "undefined") return;

    const updateTheme = () => {
      const htmlClass = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
      setTheme(htmlClass);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [setTheme]);

  return (
    <root.div>
      <link rel="stylesheet" href="/shadow-wrapper.css" />
      <ThemeProvider theme={theme}>
        <div className={`theme-${nextraTheme} shadow-wrapper`}>{children}</div>
      </ThemeProvider>
    </root.div>
  );
};

export default ShadowWrapper;
