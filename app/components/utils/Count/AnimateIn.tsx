import { motion, useInView } from "framer-motion";
import { FC, ReactNode, useRef } from "react";

export type AnimateInProps = {
  children: ReactNode;
};

export const AnimateIn: FC<AnimateInProps> = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-200px", once: true });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
