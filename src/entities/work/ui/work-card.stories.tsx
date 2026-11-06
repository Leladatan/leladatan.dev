import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WorkCard } from "./work-card";

const meta = {
  title: "Entities/WorkCard",
  component: WorkCard,
} satisfies Meta<typeof WorkCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TaskManager: Story = {
  args: {
    href: "/ru/work/task-manager",
    index: "01",
    title: "Таск-менеджер",
    summary: "Канбан, диаграмма Ганта, длинные списки и поиск по проектам.",
    stack: ["TypeScript", "React", "TanStack Query"],
    locale: "ru",
  },
};
