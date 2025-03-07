import { theme, ThemeProvider } from "reablocks";
import { FC, ReactNode, useEffect, useState } from "react";
import root from "react-shadow";

export type ShadowWrapperProps = {
  children: ReactNode;
};

export const ShadowWrapper: FC<ShadowWrapperProps> = ({ children }) => {
  const [themeClass, setThemeClass] = useState("");

  useEffect(() => {
    if (typeof document === "undefined") return;

    const updateTheme = () => {
      const htmlClass = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
      setThemeClass(htmlClass);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <root.div>
      <link rel="stylesheet" href="/shadow-wrapper.css" />
      <ThemeProvider theme={theme}>
        <div className={`theme-${themeClass}`}>{children}</div>
      </ThemeProvider>
    </root.div>
  );
};

export default ShadowWrapper;
