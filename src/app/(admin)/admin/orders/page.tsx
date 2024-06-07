"use client";
import React, { useEffect, useState } from "react";
import { PageWrapper } from "~/components/wrapper/PageWrapper";
import OrdersTable from "./components/OrdersTable";
import { api } from "~/utils/api";
import Pagination from "~/app/(user)/products/components/Pagination";
import SearchInput from "~/components/inputs/SearchInput";
import Loader from "~/components/Loader";
import SectionWrapper from "~/components/wrapper/SectionWrapper";
import NoDataFound from "~/components/ui/NoDataFound";

const AdminOrdersPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data: data, isLoading } = api.admin.getAllOrders.useQuery({
    page: page,
    limit: 10,
    search: search,
  });

  return (
    <PageWrapper>
      <SearchInput
        setSearch={setSearch}
        search={search}
        placeholder="Search with orderId username email payment intent"
        loading={isLoading}
        disabled={isLoading}
      />
      <SectionWrapper>
        {!data || isLoading ? (
          <Loader />
        ) : (
          <>
            <OrdersTable orders={data.orders} />
            <Pagination next={data?.hasMore} page={page} setPage={setPage} />
          </>
        )}
        {data?.orders.length === 0 && !isLoading ? (
          <NoDataFound
            title="No Orders Found"
            subtitle="Ooops something wrong with your query input "
          />
        ) : null}
      </SectionWrapper>
    </PageWrapper>
  );
};

export default AdminOrdersPage;
