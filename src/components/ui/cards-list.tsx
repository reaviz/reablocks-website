import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { AnimateIn } from "../utils/AnimateIn";

export const CardsList = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: React.ReactNode | string;
    link: string;
    backgroundImage: string;
  }[];
  className?: string;
}) => (
  <AnimateIn>
    <div
      className={cn(
        "grid grid-cols-1 py-10  md:grid-cols-2  lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="group relative block h-full w-full p-2"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="h-full"
          >
            <Card backgroundImage={item.backgroundImage}>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </motion.div>
        </Link>
      ))}
    </div>
  </AnimateIn>
);

export const Card = ({
  className,
  children,
  backgroundImage,
}: {
  className?: string;
  children: React.ReactNode;
  backgroundImage: string;
}) => {
  return (
    <div
      className={cn(
        "relative z-20 h-full w-full overflow-hidden rounded-lg border border-primary-hover bg-[rgba(4,16,40,0.40)]  p-2 pt-32 transition-colors hover:border-secondary hover:bg-[rgba(4,16,40,1)]",
        className,
      )}
    >
      <Image
        draggable={false}
        src={backgroundImage}
        alt={`Background image`}
        width={100}
        height={100}
        className="absolute left-0 top-0 h-full w-full"
      />
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("mt-4 font-bold tracking-wide text-zinc-100", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2 text-sm leading-relaxed tracking-wide text-zinc-400",
        className,
      )}
    >
      {children}
    </p>
  );
};
