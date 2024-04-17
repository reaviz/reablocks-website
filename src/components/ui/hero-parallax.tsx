"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import React, { FC, ReactNode, useState } from "react";

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
  const [isImageLoaded, setImageIsLoaded] = useState<boolean>(false);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 1000, damping: 100, bounce: 10 };

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [18, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.3, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [30, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [-480, 650]),
    springConfig,
  );
  return (
    <div className={className} ref={ref}>
      {children}
      <div className="flex h-[1650px] w-full flex-col antialiased [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isImageLoaded ? 1 : 0 }}
            className="mb-20 flex justify-center space-x-20 space-x-reverse px-24"
          >
            <Image
              draggable={false}
              src={src}
              height={height}
              width={width}
              onLoadingComplete={() => setImageIsLoaded(true)}
              alt="hero image"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
