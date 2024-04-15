"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import React, { FC, ReactNode } from "react";

export type HeroParallaxProps = {
  src: string;
  width: number;
  height: number;
  children: ReactNode;
  className?: string;
};

export const HeroParallax: FC<HeroParallaxProps> = ({
  src,
  width,
  height,
  children,
  className,
}) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.5, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [30, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-490, 800]),
    springConfig,
  );
  return (
    <div className={className} ref={ref}>
      {children}
      <div className="flex h-[300vh] w-full flex-col antialiased [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
          }}
        >
          <motion.div className="mb-20 flex justify-center space-x-20 space-x-reverse px-24">
            <Image src={src} height={height} width={width} alt="hero image" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
