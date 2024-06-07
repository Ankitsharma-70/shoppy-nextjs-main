"use client";
import React from "react";
import AddressModal from "~/components/modals/AddressModal";
import { PageWrapper } from "~/components/wrapper/PageWrapper";
import UserAddressList from "./components/UserAddressList";
import { Tab } from "@headlessui/react";
import UserProfile from "./components/UserProfile";

const page = () => {
  return (
    <PageWrapper>
      <Tab.Group>
        <Tab.List className={"flex gap-4"}>
          <Tab
            as="button"
            className={
              "rounded-full bg-brand-100 px-6 py-2 text-sm focus:outline-transparent "
            }
          >
            Profile
          </Tab>
          <Tab
            as="button"
            className={
              "rounded-full bg-brand-100 px-6 py-2 text-sm focus:outline-transparent "
            }
          >
            Manager Addresses
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <UserProfile />
          </Tab.Panel>
          <Tab.Panel className={"mt-10 grid gap-4"}>
            <AddressModal />
            <UserAddressList />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </PageWrapper>
  );
};

export default page;
