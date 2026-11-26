type ClassValue = string | false | null | undefined;

/** Lightweight class merger — swap for clsx + tailwind-merge when shadcn/ui is added. */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
