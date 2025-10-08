import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { cn } from "../lib/utils"

export function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50 h-9 w-9 relative",
        className
      )}
    >
      <Sun 
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all",
          theme === "light" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        )} 
      />
      <Moon 
        className={cn(
          "absolute h-[1.2rem] w-[1.2rem] transition-all",
          theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
        )} 
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
