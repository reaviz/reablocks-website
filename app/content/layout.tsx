"use client";
import { ExternalDocs, Unstyled } from "@storybook/blocks";
import * as reactAnnotations from "@storybook/react/dist/entry-preview.mjs";
import posthog from "posthog-js";
import { theme, ThemeProvider } from "reablocks";
import { FC, ReactNode, useEffect } from "react";
import * as previewAnnotations from "../../.storybook/preview";

const layout: FC<{ children: ReactNode }> = ({ children }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    try {
      posthog.init("phc_KpMeH726m3pXXzMzj5AuiY1SDPstX8pTVxmxPEJkiCK", {
        api_host: "https://us.i.posthog.com",
      });
    } catch {
      /** noop */
    }
  }, []);

  return (
    <div>
      <ExternalDocs
        projectAnnotationsList={[reactAnnotations, previewAnnotations]}
      >
        <Unstyled>
          test layout
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Unstyled>
      </ExternalDocs>
    </div>
  );
};

export default layout;
