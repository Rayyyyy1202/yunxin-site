"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-10 flex flex-col items-center gap-0">
      <div className="flex items-center h-[192px] w-6 justify-center">
        <motion.span
          className="text-text-secondary text-[16px] tracking-[1.6px] uppercase rotate-90 whitespace-nowrap origin-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          Scroll to explore
        </motion.span>
      </div>
      <motion.div
        className="w-px h-20 bg-gradient-to-b from-purple-primary to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
      />
    </div>
  );
}
