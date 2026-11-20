import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sun, Moon, ArrowRight, LayoutDashboard, LogIn } from 'lucide-react'
import { useAuthStore } from '@/features/auth/store'
import { useDarkMode } from '@/hooks/useDarkMode'

export const LandingNavbar: React.FC = () => {
  const { isDark, toggleDarkMode } = useDarkMode()
  const { isAuthenticated, token } = useAuthStore()
  const navigate = useNavigate()

  const isLoggedIn = Boolean(token || isAuthenticated)

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-gray-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            TRM
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white leading-none">
              Team Resource
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary dark:text-indigo-400 mt-0.5">
              Enterprise CRM
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-gray-600 dark:text-slate-300">
          <a href="#features" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">
            Features
          </a>
          <a href="#app-drawer" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">
            App Drawer
          </a>
          <a href="#tour" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">
            Product Tour
          </a>
          <a href="#roi-calculator" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">
            ROI Calculator
          </a>
          <a href="#comparison" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">
            Why TRM?
          </a>
          <a href="#pricing" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Switcher */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isLoggedIn ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all hover:scale-105"
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-slate-200 hover:text-primary dark:hover:text-indigo-400 transition-colors"
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold text-sm shadow-md shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:-translate-y-0.5"
              >
                <span>Get Started Free</span>
                <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
