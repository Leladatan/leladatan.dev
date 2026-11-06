import { type ReactNode, ViewTransition } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return <ViewTransition name="page-swap">{children}</ViewTransition>;
}
