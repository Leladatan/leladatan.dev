import type { Preview } from "@storybook/nextjs-vite";
import { ThemeProvider } from "../src/shared/theme/theme-provider";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="bg-bg p-8 text-ink">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
