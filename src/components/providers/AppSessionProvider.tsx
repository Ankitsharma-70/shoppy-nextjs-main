"use client";
import type { Session } from "next-auth";
import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
const AppSessionProvider = ({
  session,
  children,
}: {
  session: Session;
  children: ReactNode;
}) => {
  return (
    <SessionProvider session={session}>
      <Toaster position="top-left" />
      {children}
    </SessionProvider>
  );
};

export default AppSessionProvider;
