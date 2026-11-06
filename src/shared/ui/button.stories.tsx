import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

const meta = {
  title: "Shared/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: { children: "На главную", href: "/ru" },
};

export const Ghost: Story = {
  args: { children: "Обо мне", href: "/ru/about", variant: "ghost" },
};
