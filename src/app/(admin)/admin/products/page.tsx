"use client";

import React, { useState } from "react";

import Pagination from "~/app/(user)/products/components/Pagination";
import { PageWrapper } from "~/components/wrapper/PageWrapper";
import SearchInput from "~/components/inputs/SearchInput";
import { api } from "~/utils/api";
import ProductsTable from "./components/ProductsTable";
import Loader from "~/components/Loader";
import SectionWrapper from "~/components/wrapper/SectionWrapper";
import NoDataFound from "~/components/ui/NoDataFound";

const AdminProductsPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);

  const { data: data, isLoading } = api.admin.getAllProducts.useQuery({
    page: page,
    limit: 10,
    search: search,
  });
  return (
    <PageWrapper>
      <SearchInput
        search={search}
        setSearch={setSearch}
        placeholder="Search by Brand, Name"
        loading={isLoading}
        disabled={isLoading}
      />
      <SectionWrapper>
        {!data || isLoading ? (
          <Loader />
        ) : (
          <>
            <ProductsTable products={data.products} />
            <Pagination next={data?.hasMore} page={page} setPage={setPage} />
          </>
        )}
        {data?.products.length === 0 && !isLoading ? (
          <NoDataFound
            title="No products Found"
            subtitle="Ooops something wrong with your query input "
          />
        ) : null}
      </SectionWrapper>
    </PageWrapper>
  );
};

export default AdminProductsPage;
