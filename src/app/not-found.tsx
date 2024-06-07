import React from "react";
import Button from "~/components/Button";
import { PageWrapper } from "~/components/wrapper/PageWrapper";

export default function NotFound() {
  return (
    <PageWrapper className="flex h-full flex-col items-center justify-center gap-6">
      <div className=" flex flex-col items-center ">
        <p className="text-base font-semibold text-brand-600">404</p>
        <h1 className=" text-[clamp(1.5rem,8vw,3rem)] font-bold tracking-tight text-gray-900 ">
          Page not found
        </h1>
        <p className="text-base leading-7 text-gray-700">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
      </div>
      <div className="flex items-center justify-center gap-x-6">
        <Button href="/" variant={"primary"} size={"large"}>
          Go back home
        </Button>
        <Button href="/contact" className="text-sm font-semibold text-gray-900">
          Contact support <span aria-hidden="true">&rarr;</span>
        </Button>
      </div>
    </PageWrapper>
  );
}
