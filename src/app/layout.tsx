// @ts-nocheck
import type { Session } from "next-auth";
import Header from "~/components/header/Header";
import AppSessionProvider from "../components/providers/AppSessionProvider";
import "./globals.css";
import Footer from "~/components/Footer";
import AdminSideBar from "~/components/AdminSideBar";
import Banner from "~/components/Banner";
import ReduxProvider from "~/components/providers/ReduxProvider";
import TrpcProvider from "~/components/providers/TrpcProvider";
const RootLayout = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) => {
  return (
    <html lang="en">
      <head>
        <title>Shoppy</title>
      </head>
      <body className=" grid min-h-[100dvh] w-full grid-rows-[auto_auto_1fr_auto]   bg-light-500">
        <AppSessionProvider session={session}>
          <TrpcProvider>
            <ReduxProvider>
              <Banner />
              <Header />
              <AdminSideBar />
              {children}
              <Footer />
            </ReduxProvider>
          </TrpcProvider>
        </AppSessionProvider>
      </body>
    </html>
  );
};
export default RootLayout;
