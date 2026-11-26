import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "main";
};

/** Shared content width primitive — keep pages free of duplicated max-width classes. */
export function Container({
  children,
  className,
  as: Comp = "div",
}: ContainerProps) {
  return (
    <Comp className={cn("mx-auto w-full max-w-6xl px-6", className)}>
      {children}
    </Comp>
  );
}
