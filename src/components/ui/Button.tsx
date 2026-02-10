import Link from "next/link";
import { forwardRef } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
};

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "outline";
  target?: string;
  rel?: string;
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all focus-visible:ring-2";

const variantClasses: Record<string, string> = {
  primary: "bg-neon-500 text-base-900 shadow-glow hover:bg-neon-400",
  ghost: "bg-white/5 text-white hover:bg-white/10",
  outline: "border border-white/15 text-white hover:border-neon-500 hover:text-neon-400",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
);
Button.displayName = "Button";

export function ButtonLink({ href, children, className = "", variant = "primary", target, rel }: LinkProps) {
  return (
    <Link href={href} target={target} rel={rel} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </Link>
  );
}
