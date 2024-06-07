import React from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import type { HtmlHTMLAttributes } from "react";
interface BadgeProps
  extends VariantProps<typeof badgeClasses>,
    HtmlHTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const badgeClasses = cva(
  " rounded-full capitalize  duration-300 w-fit ease-in-out inline-flex items-center justify-center gap-2",
  {
    variants: {
      variant: {
        green: " bg-green-100 text-green-700",
        red: "bg-red-100 text-red-700",
        brand: "bg-brand-100 text-brand-700",
        amber: "bg-amber-50 text-amber-700",
      },
      size: {
        small: "py-1  px-4 text-xs",
        medium: "py-1.5  px-3 text-sm",
        large: "py-2 px-6 text-base",
        noStyle: "",
      },
    },
    defaultVariants: {
      size: "large",
    },
  }
);

const Badge = ({ children, size, variant, ...props }: BadgeProps) => {
  const classes = badgeClasses({ size, variant, className: props.className });
  return <span className={classes}>{children}</span>;
};

export default Badge;
