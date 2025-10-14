import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ThemeToggle } from './theme-toggle'
import { LanguageSelector } from './language-selector'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { logoutUser } from '../utils/auth'
import { ChevronDown, LogOut } from 'lucide-react'


export default function Navbar({ user }) {
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check if 'dark' class is present on <html>
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    // Listen for class changes (for live theme switching)
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const handleLogout = () => {
    // Clear user session from localStorage
    logoutUser()
    // Navigate to login page using React Router
    navigate('/login')
  }

  const navigate = useNavigate()
  const initials = user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() : 'U'
   

  return (
    <header
      className={`sticky top-0 z-50 border-b border-black/10 dark:border-white/10 transition-colors ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Logo - Fixed Left */}
        <div className="flex-shrink-0">
          <a href="#hero" className="flex items-center gap-3">
            <img src="/Logo.jpg" alt="Logo" className="h-8 w-auto" />
            <span className="sr-only">Home</span>
          </a>
        </div>

        <ul className="hidden md:flex items-center gap-8">
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-1 hover:text-green-500 dark:hover:text-green-400 transition-colors">
                  {t('nav.home')}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                <DropdownMenuItem onClick={() => navigate('/home')}>
                  {t('nav.home1')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/home2')}>
                  {t('nav.home2')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          
          <li>
            <button onClick={() => navigate('/about')} className="hover:text-green-500 dark:hover:text-green-400 transition-colors">
              {t('nav.about')}
            </button>
          </li>

          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-1 hover:text-green-500 dark:hover:text-green-400 transition-colors">
                  {t('nav.services')}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {/* All Services Section */}
                <DropdownMenuItem 
                  onClick={() => navigate('/services')}
                  className="font-semibold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                >
                  {t('nav.allServices')}
                </DropdownMenuItem>
                
                {/* Separator */}
                <div className="h-px bg-gray-200 dark:bg-gray-700 mx-2 my-1" />
                
                {[
                  {label: t('nav.sportsTraining'), path:'/services/sports-training'},
                  {label: t('nav.spaTherapies'), path:'/services/spa-therapies'},
                  {label: t('nav.holisticHealing'), path:'/services/holistic-healing'},
                  {label: t('nav.nutritionPlans'), path:'/services/nutrition-plans'},
                  {label: t('nav.mindfulLiving'), path:'/services/mindful-living'},
                  {label: t('nav.wellnessEvents'), path:'/services/wellness-events'}
                ].map((item) => (
                  <DropdownMenuItem 
                    key={item.label} 
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>

          <li>
            <button onClick={() => navigate('/blog')} className="hover:text-green-500 dark:hover:text-green-400 transition-colors">
              {t('nav.blog')}
            </button>
          </li>
          <li>
            <button onClick={() => navigate('/contact')} className="hover:text-green-500 dark:hover:text-green-400 transition-colors">
              {t('nav.contact')}
            </button>
          </li>
        </ul>
        {/* Right Side - Fixed */}
        <div className="flex items-center gap-4">
          {/* Language Selector - Fixed Right */}
          <LanguageSelector />
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <button className="md:hidden inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/10 px-3 py-2 hover:bg-black/5 dark:hover:bg-white/5" aria-label="Menu">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* User Avatar */}
          <div className="h-9 w-9 rounded-full bg-green-500 dark:bg-green-600 text-white grid place-items-center font-semibold select-none">
            {initials}
          </div>
          
          {/* Logout Button - Right Corner (icon only) */}
          <button
            onClick={handleLogout}
            className="hover:text-green-500 dark:hover:text-green-400 transition-colors inline-flex items-center justify-center"
            aria-label={t('nav.logout')}
            title={t('nav.logout')}
          >
            <LogOut className="h-5 w-5" />
            <span className="sr-only">{t('nav.logout')}</span>
          </button>
        </div>
      </nav>
    </header>
  )
}