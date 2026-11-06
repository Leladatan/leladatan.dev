import type { ReactNode } from "react";
import { ThemeProvider } from "@/shared/theme/theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
