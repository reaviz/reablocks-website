"use client";
import { cn } from "@/utils/cn";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const TracingBeams = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1_left = useSpring(
    useTransform(scrollYProgress, [0, 0.75], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
    },
  );
  const y2_left = useSpring(
    useTransform(scrollYProgress, [0, 0.95], [50, svgHeight - 200]),
    {
      stiffness: 500,
      damping: 90,
    },
  );

  return (
    <div className="flex flex-1 overflow-visible">
      <motion.div
        ref={ref}
        className={cn("relative flex-1", containerClassName)}
      >
        <div className={cn("absolute left-8 z-50", className)}>
          <svg
            viewBox={`0 0 20 ${svgHeight}`}
            width="20"
            height={svgHeight} // Set the SVG height
            aria-hidden="true"
          >
            <motion.path
              d={`M 1 0 V ${svgHeight}`}
              fill="none"
              stroke="#9091A0"
              strokeOpacity="0.16"
              transition={{
                duration: 10,
              }}
            ></motion.path>
            <motion.path
              d={`M 1 0 V ${svgHeight}`}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="1.25"
              className="motion-reduce:hidden"
              transition={{
                duration: 10,
              }}
            ></motion.path>
            <defs>
              <motion.linearGradient
                id="gradient"
                gradientUnits="userSpaceOnUse"
                x1="0"
                x2="0"
                y1={y1_left} // set y1 for gradient
                y2={y2_left} // set y2 for gradient
              >
                <stop stopColor="#87AEFF" stopOpacity="0"></stop>
                <stop stopColor="#87AEFF"></stop>
                <stop offset="1" stopColor="#87AEFF" stopOpacity="0"></stop>
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>
      <div ref={contentRef}>{children}</div>
      <motion.div
        ref={ref}
        className={cn("relative flex-1", containerClassName)}
      >
        <div className={cn("absolute right-8 z-50", className)}>
          <svg
            viewBox={`0 0 20 ${svgHeight}`}
            width="20"
            height={svgHeight} // Set the SVG height
            aria-hidden="true"
          >
            <motion.path
              d={`M 1 0 V ${svgHeight}`}
              fill="none"
              stroke="#9091A0"
              strokeOpacity="0.16"
              transition={{
                duration: 10,
              }}
            ></motion.path>
            <motion.path
              d={`M 1 0 V ${svgHeight}`}
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="1.25"
              className="motion-reduce:hidden"
              transition={{
                duration: 10,
              }}
            ></motion.path>
            <defs>
              <motion.linearGradient
                id="gradient2"
                gradientUnits="userSpaceOnUse"
                x1="0"
                x2="0"
                // randomize these values to have right side randomly shoot down the page?
                // y1={y1_right} // set y1 for gradient
                // y2={y2_right} // set y2 for gradient
              >
                <stop stopColor="#87AEFF" stopOpacity="0"></stop>
                <stop stopColor="#87AEFF"></stop>
                <stop offset="1" stopColor="#87AEFF" stopOpacity="0"></stop>
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};
