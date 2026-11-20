import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('trm-theme')
    if (saved !== null) {
      return saved === 'dark'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('trm-theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('trm-theme', 'light')
    }
  }, [isDark])

  const toggleDarkMode = () => setIsDark((prev) => !prev)

  return { isDark, toggleDarkMode, setIsDark }
}
