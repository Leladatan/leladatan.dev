import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LocaleSwitch } from "./locale-switch";

const meta = {
  title: "Features/LocaleSwitch",
  component: LocaleSwitch,
} satisfies Meta<typeof LocaleSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Russian: Story = {
  args: { locale: "ru", path: "/ru/work" },
};
