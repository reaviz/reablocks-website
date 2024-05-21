import { motion, useInView } from "framer-motion";
import { FC, ReactNode, useRef } from "react";

export type AnimateInProps = {
  children: ReactNode;
  className?: string;
};

export const AnimateIn: FC<AnimateInProps> = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-200px", once: true });

  return (
    <div ref={ref} className={className}>
      {isInView && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};
