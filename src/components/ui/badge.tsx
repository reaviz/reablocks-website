import { cn } from "@/utils/cn";
import { FC, ReactNode } from "react";

export type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export const Badge: FC<BadgeProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-2 rounded-full border border-[#0D4ED2] bg-[#041028] px-3 py-1 text-content-primary",
        className,
      )}
    >
      {children}
    </div>
  );
};
