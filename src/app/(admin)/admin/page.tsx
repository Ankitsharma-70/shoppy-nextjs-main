import React from "react";
import { PageWrapper } from "~/components/wrapper/PageWrapper";
import RecentOrders from "./components/RecentOrders";

import AdminChartOrder from "./components/AdminChartOrder";
const AdminPage = () => {
  return (
    <PageWrapper className="grid gap-10">
      <AdminChartOrder />
      <RecentOrders />
    </PageWrapper>
  );
};

export default AdminPage;
