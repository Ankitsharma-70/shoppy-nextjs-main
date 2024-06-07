import React from "react";

const NoDataFound = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className=" flex h-full flex-col items-center justify-center py-10">
      <h2 className="  text-2xl font-medium text-gray-900">{title}</h2>
      <p className=" text-sm text-gray-700">{subtitle}</p>
    </div>
  );
};

export default NoDataFound;
