"use client";
import React from "react";
import { api } from "~/utils/api";
type Props = {
  children: any;
};
const TrpcProvider = (props: Props) => {
  return <>{props.children}</>;
};

export default api.withTRPC(TrpcProvider);
