import React from "react";

const PageHeading = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <section>
      <h2 className=" text-[clamp(1.3rem,6vw,2rem)] font-medium capitalize text-gray-900">
        {title}
      </h2>
      <p className="pb-4 text-sm font-light capitalize text-gray-700">
        {subtitle}
      </p>
    </section>
  );
};

export default PageHeading;
