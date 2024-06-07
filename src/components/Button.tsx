import React from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { MoonLoader, PuffLoader } from "react-spinners";
type ButtonBaseProps = VariantProps<typeof buttonClasses> & {
  children: React.ReactNode;
};

interface ButtonAsLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}
interface ButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
  loading?: boolean;
}
export type ButtonProps = ButtonBaseProps &
  (ButtonAsLinkProps | ButtonAsButtonProps);

const buttonClasses = cva(
  "  duration-300 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ease-in-out inline-flex items-center justify-center gap-2",
  {
    variants: {
      variant: {
        primary:
          "bg-brandGradient text-white rounded-md  font-medium hover:opacity-80  ",
        secondary:
          "border-brand-100 border-2 rounded-md  hover:border-brand-200 hover:bg-brand-100",
        tertiary: "hover:opacity-80 ",
        danger: " text-red-500 hover:bg-red-200",
      },
      size: {
        small: "py-1.5  px-4 text-xs",
        medium: "py-2  px-4 text-sm",
        large: "py-2.5 px-6 text-base",
        noStyle: "",
      },
    },
    defaultVariants: {
      variant: "tertiary",
      size: "noStyle",
    },
  }
);

const Button = ({ children, variant, size, ...props }: ButtonProps) => {
  const classes = buttonClasses({ variant, size, className: props.className });
  if ("href" in props && props.href !== undefined) {
    return (
      <Link {...props} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={classes}>
      {props.loading ? (
        <MoonLoader
          size={18}
          color={variant === "primary" ? "white" : "#7a4ce6"}
        />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default Button;
