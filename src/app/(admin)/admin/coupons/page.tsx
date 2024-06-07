"use client";
import React, { useState } from "react";
import { PageWrapper } from "~/components/wrapper/PageWrapper";
import CreateCouponForm from "./components/CreateCouponForm";
import { api } from "~/utils/api";
import SearchInput from "~/components/inputs/SearchInput";
import CouponTable from "./components/CouponTable";
import Modal from "~/components/modals/Modal";
import Pagination from "~/app/(user)/products/components/Pagination";
import Loader from "~/components/Loader";
import SectionWrapper from "~/components/wrapper/SectionWrapper";
import CustomSidebar from "~/components/ui/CustomSidebar";
import { BsDiagram3 } from "react-icons/bs";

const CouponsPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const { data: data, isLoading } = api.admin.getAllCoupons.useQuery({
    page: page,
    limit: limit,
    search: search,
  });

  return (
    <PageWrapper className="grid h-fit">
      <CustomSidebar
        button={
          <>
            <BsDiagram3 /> Create Code
          </>
        }
        title="Create Coupon Code"
        variant={"secondary"}
        size={"medium"}
        className="ml-auto"
        sidebarSize="xxLarge"
      >
        <CreateCouponForm />
      </CustomSidebar>

      <SearchInput
        search={search}
        setSearch={setSearch}
        placeholder="Search by Title, code"
        loading={isLoading}
        disabled={isLoading}
      />
      <SectionWrapper>
        {!data || isLoading ? (
          <Loader />
        ) : (
          <>
            <CouponTable coupons={data.coupons} />
            <Pagination next={data.hasMore} setPage={setPage} page={page} />
          </>
        )}
        {data?.coupons.length === 0 && !isLoading ? (
          <p className=" text-center text-sm text-gray-700">No Data Found</p>
        ) : null}
      </SectionWrapper>
    </PageWrapper>
  );
};

export default CouponsPage;
