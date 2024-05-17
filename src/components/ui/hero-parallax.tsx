"use client";
import { useViewportDimensions } from "@/hooks/useViewportDimensions";
import { cn } from "@/utils/cn";
import {
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";

export type HeroParallaxProps = {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  children: React.ReactNode;
  className?: string;
};

export const HeroParallax = ({
  products,
  children,
  className,
}: HeroParallaxProps) => {
  const { width, height } = useViewportDimensions();

  const firstRow = products.slice(0, 10);
  const secondRow = products.slice(10, 20);
  const thirdRow = products.slice(20, 30);
  const ref = React.useRef(null);

  const isMobile = useMemo(() => width < 1024, [width]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [isMobile ? "-5% start" : "-10% start", "end start"],
  });

  const springConfig = {
    bounce: 0.1,
    damping: 100,
    stiffness: 1000,
    duration: 0.1,
  };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [500, 1500]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [-500, -1500]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.7], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.4], [-height, 250]),
    springConfig,
  );

  return (
    <div ref={ref}>
      {children}
      <div
        className={cn(
          "flex h-[1200px] max-w-[100vw] flex-col self-auto pt-40 antialiased [perspective:1000px] [transform-style:preserve-3d] md:max-w-[1440px]",
          className,
        )}
      >
        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
          }}
        >
          <motion.div className="mb-3 flex flex-row-reverse space-x-3 space-x-reverse ">
            {firstRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="mb-3 flex flex-row space-x-3  ">
            {secondRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="flex flex-row-reverse space-x-3 space-x-reverse">
            {thirdRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  const [isImageLoaded, setImageIsLoaded] = useState<boolean>(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isImageLoaded ? 1 : 0 }}
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
        boxShadow: "0px 20px 20px 10px rgba(0,0,0,0.2)",
      }}
      key={product.title}
      className="group/product relative h-[400px] w-[300px] flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          height="400"
          width="300"
          className="absolute inset-0 object-cover object-left-top md:h-full md:w-full"
          alt={product.title}
          onLoadingComplete={() => setImageIsLoaded(true)}
          priority
        />
      </Link>
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-black opacity-0 transition-opacity group-hover/product:opacity-30"></div>
    </motion.div>
  );
};
