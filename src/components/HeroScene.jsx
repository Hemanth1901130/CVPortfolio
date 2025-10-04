import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SkillsIconCloud from "./SkillsIconCloud";

const HeroScene = () => {
  return (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full h-full flex items-center justify-center"
      >
        <SkillsIconCloud />
      </motion.div>
    </div>
  );
};

export default HeroScene;
