import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { MobileMenu } from './MobileMenu'

export const RootLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#F8F9FD] dark:bg-slate-900 font-sans transition-colors duration-300 overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Navigation */}
      <MobileMenu />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative flex flex-col">
        <Header />

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 w-full flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
