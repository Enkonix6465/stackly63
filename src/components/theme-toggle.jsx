import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { cn } from "../lib/utils"

export function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-200/50 hover:text-gray-800 dark:hover:bg-gray-700/50 dark:hover:text-white h-9 w-9 relative",
        className
      )}
      style={{
        color: theme === 'dark' ? '#ffffff' : '#374151'
      }}
    >
      <Sun 
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all",
          theme === "light" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        )}
        style={{
          color: theme === 'dark' ? '#ffffff' : '#374151'
        }}
      />
      <Moon 
        className={cn(
          "absolute h-[1.2rem] w-[1.2rem] transition-all",
          theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
        )}
        style={{
          color: theme === 'dark' ? '#ffffff' : '#374151'
        }}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
