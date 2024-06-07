"use client";
import React from "react";
import TimeAgo from "react-timeago";

const TimeAgoComponent = ({
  date,
  className,
}: {
  date: Date;
  className?: string;
}) => {
  return <TimeAgo date={date} className={className} />;
};

export default TimeAgoComponent;
