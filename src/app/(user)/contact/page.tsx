import React from "react";
import { PageWrapper } from "~/components/wrapper/PageWrapper";

const ContactPage = () => {
  return (
    <PageWrapper>
      <div className=" flex flex-col items-center justify-center">
        <h2 className=" text-[clamp(1.3rem,6vw,2rem)] font-medium text-gray-900">
          Contact Support
        </h2>
        <p className=" text-sm font-light text-gray-700 ">
          Write your query and we will try to solve them as soon as possible
        </p>
      </div>
    </PageWrapper>
  );
};

export default ContactPage;
