import { cn } from "@/utils/cn";
import React, { FC } from "react";

export type DividerProps = {
  className?: string;
};

export const Divider: FC<DividerProps> = ({ className }) => {
  return <hr className={cn("w-full border border-[#262631]", className)} />;
};
