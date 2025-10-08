import { useTheme } from "./theme-provider"

export function ThemeDebug() {
  const { theme } = useTheme()
  
  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 text-xs">
      Current theme: {theme}
    </div>
  )
}
