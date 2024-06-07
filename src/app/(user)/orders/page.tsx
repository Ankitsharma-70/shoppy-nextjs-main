"use client";
import React from "react";
import PageHeading from "~/components/PageHeading";
import { PageWrapper } from "~/components/wrapper/PageWrapper";
import OrderList from "./components/OrderList";
import { useState } from "react";
import Breadcrumbs from "~/components/BreadCrumbs";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import NoDataFound from "~/components/ui/NoDataFound";
import Pagination from "../products/components/Pagination";
import Loader from "~/components/Loader";
import { useRouter } from "next/navigation";

const UserOrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  const { data: data, isLoading } = api.order.getAll.useQuery(
    {
      page: page,
      limit: limit,
    },
    {
      enabled: session?.user ? true : false,
    }
  );

  if (!session?.user && status !== "loading") {
    router.push("/");
  }

  return (
    <PageWrapper>
      <Breadcrumbs replaceCharacterList={[{ from: "-", to: " " }]} />
      <PageHeading title="Your Orders" subtitle="Contain all of your orders" />
      {!data || isLoading ? (
        <Loader />
      ) : (
        <>
          <OrderList orders={data?.orders} />
          <Pagination next={data.hasMore} page={page} setPage={setPage} />
        </>
      )}
      {data?.orders.length === 0 && !isLoading ? (
        <NoDataFound
          title="No orders found"
          subtitle="You have no order placed till now "
        />
      ) : null}
    </PageWrapper>
  );
};

export default UserOrdersPage;
