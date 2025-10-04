import React from "react"
import { motion } from "motion/react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils"

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  whileHover: {
    scale: 1.05,
    boxShadow: "0 0 40px rgba(59, 130, 246, 0.4)"
  },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 0.5,
    type: "spring",
    stiffness: 25,
    damping: 20,
    mass: 1.5,
    scale: {
      type: "spring",
      stiffness: 300,
      damping: 10,
      mass: 0.3,
    },
  },
}

export const ShinyButton = React.forwardRef(({ children, className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : motion.button

  const buttonContent = (
    <>
      <span
        className="relative block size-full text-sm tracking-wide text-[rgb(0,0,0,65%)] uppercase dark:font-light dark:text-[rgb(255,255,255,90%)]"
        style={{
          maskImage:
            "linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))",
        }}>
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          WebkitMask:
            "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          backgroundImage:
            "linear-gradient(-75deg,var(--primary)/10% calc(var(--x)+20%),var(--primary)/50% calc(var(--x)+25%),var(--primary)/10% calc(var(--x)+100%))",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] p-px" />
    </>
  )

  if (asChild) {
    return (
      <Comp
        ref={ref}
        className={cn(
          "relative cursor-pointer rounded-lg border px-6 py-2 font-medium backdrop-blur-xl transition-all duration-300 ease-in-out hover:shadow-2xl dark:bg-[radial-gradient(circle_at_50%_0%,var(--primary)/20%_0%,transparent_60%)] dark:hover:shadow-[0_0_30px_var(--primary)/20%] shadow-lg",
          className
        )}
        {...props}>
        {buttonContent}
      </Comp>
    )
  }

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative cursor-pointer rounded-lg border px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,var(--primary)/10%_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_var(--primary)/10%]",
        className
      )}
      {...animationProps}
      {...props}>
      {buttonContent}
    </motion.button>
  );
})

ShinyButton.displayName = "ShinyButton"
