import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { useTheme } from "../../context/ThemeContext"

import { cn } from "../../lib/utils"

export const AnimatedThemeToggler = ({
  className
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme()
  const buttonRef = useRef(null)

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return

    await document.startViewTransition(() => {
      flushSync(() => {
        toggleDarkMode()
      })
    }).ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    document.documentElement.animate({
      clipPath: [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${maxRadius}px at ${x}px ${y}px)`,
      ],
    }, {
      duration: 700,
      easing: "ease-in-out",
      pseudoElement: "::view-transition-new(root)",
    })
  }, [toggleDarkMode])

  return (
    <button ref={buttonRef} onClick={toggleTheme} className={cn(className)}>
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
}
