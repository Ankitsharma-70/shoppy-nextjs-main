"use client";
import React, { useState } from "react";
import { api } from "~/utils/api";
import UsersTable from "./components/UsersTable";
import { PageWrapper } from "~/components/wrapper/PageWrapper";
import SearchInput from "~/components/inputs/SearchInput";
import Pagination from "~/app/(user)/products/components/Pagination";
import Loader from "~/components/Loader";
import SectionWrapper from "~/components/wrapper/SectionWrapper";

const AdminUsersPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data: data, isLoading } = api.admin.getAllUsers.useQuery({
    page: page,
    limit: 10,
    search: search,
  });

  return (
    <PageWrapper>
      <SearchInput
        search={search}
        setSearch={setSearch}
        placeholder="Search by Name / Email"
        loading={isLoading}
        disabled={isLoading}
      />

      <SectionWrapper>
        {!data || isLoading ? (
          <Loader />
        ) : (
          <>
            <UsersTable users={data.users} />
            <Pagination next={data.hasMore} page={page} setPage={setPage} />
          </>
        )}
        {data?.users.length === 0 && !isLoading ? (
          <p className=" text-center text-sm text-gray-700">No Data Found</p>
        ) : null}
      </SectionWrapper>
    </PageWrapper>
  );
};

export default AdminUsersPage;
