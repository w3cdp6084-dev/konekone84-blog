"use client";
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  path: string;
};

const PageTransition: React.FC<Props> = ({ children, path }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={path}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
