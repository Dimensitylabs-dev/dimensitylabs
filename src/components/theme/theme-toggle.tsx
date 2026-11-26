"use client";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  /** Compact icon-only control for dense nav areas. */
  size?: "sm" | "md";
};

/** Slower than Magic UI default (400ms) for a smoother reveal. */
const TOGGLE_DURATION_MS = 900;

/**
 * App theme toggle — wraps Magic UI AnimatedThemeToggler.
 * Persistence stays in the centralized next-themes provider via useTheme().
 */
export function ThemeToggle({ className, size = "md" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme, mounted } = useTheme();

  const buttonClass = cn(
    "inline-flex items-center justify-center rounded-full border border-border bg-surface-secondary text-foreground shadow-soft",
    "transition-[color,background-color,box-shadow,transform] duration-300 ease-[var(--ease-standard)]",
    "hover:bg-card hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "[&_svg]:size-4",
    size === "sm" ? "size-8" : "size-9",
    className,
  );

  if (!mounted) {
    return (
      <span
        className={cn(buttonClass, "opacity-60")}
        aria-hidden="true"
      />
    );
  }

  return (
    <AnimatedThemeToggler
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onThemeChange={setTheme}
      duration={TOGGLE_DURATION_MS}
      variant="circle"
      fromCenter={false}
      className={buttonClass}
      aria-label={
        resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
    />
  );
}
