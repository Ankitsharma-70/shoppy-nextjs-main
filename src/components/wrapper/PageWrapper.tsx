import type { ReactNode } from "react";

export const PageWrapper = ({
  children,
  className = "",
  customMaxWidth = false,
}: {
  children: ReactNode;
  className?: string;
  customMaxWidth?: boolean;
}) => {
  return (
    <main
      className={` relative mx-auto  w-full ${
        !customMaxWidth ? " max-w-7xl" : ""
      } ${className} px-4 py-10 xl:px-0 `}
    >
      {children}
    </main>
  );
};
