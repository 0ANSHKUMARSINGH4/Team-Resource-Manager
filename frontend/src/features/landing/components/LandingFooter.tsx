import React from 'react'
import { Link } from 'react-router-dom'

export const LandingFooter: React.FC = () => {
  return (
    <footer className="border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-md">
                TRM
              </div>
              <span className="font-extrabold text-lg text-gray-950 dark:text-white">
                Team Resource Manager
              </span>
            </div>
            <p className="max-w-sm text-gray-500 dark:text-slate-400 leading-relaxed mb-4">
              The modern Enterprise CRM and Resource Management engine designed for velocity, clarity, and control.
            </p>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational (99.99%)</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider text-[11px]">
              Platform
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#features" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">
                  Employee Matrix
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">
                  Kanban Delivery
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">
                  Financial Analytics
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">
                  Sprint Calendar
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider text-[11px]">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://github.com/0ANSHKUMARSINGH4/Team-Resource-Manager"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary dark:hover:text-indigo-400 transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://team-resource-backend.onrender.com/swagger-ui.html"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary dark:hover:text-indigo-400 transition-colors"
                >
                  OpenAPI / Swagger
                </a>
              </li>
              <li>
                <Link to="/login" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">
                  API Docs
                </Link>
              </li>
              <li>
                <a href="#comparison" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">
                  Salesforce Alternative
                </a>
              </li>
            </ul>
          </div>

          {/* Enterprise */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider text-[11px]">
              Security & Trust
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="hover:text-primary dark:hover:text-indigo-400 transition-colors cursor-default">
                  Spring Security 6
                </span>
              </li>
              <li>
                <span className="hover:text-primary dark:hover:text-indigo-400 transition-colors cursor-default">
                  Stateless JWT 0.12
                </span>
              </li>
              <li>
                <span className="hover:text-primary dark:hover:text-indigo-400 transition-colors cursor-default">
                  Flyway Migrations
                </span>
              </li>
              <li>
                <span className="hover:text-primary dark:hover:text-indigo-400 transition-colors cursor-default">
                  SOC2 Type II Aligned
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400 dark:text-slate-500">
          <p>© {new Date().getFullYear()} Team Resource Manager (TRM). All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/login" className="hover:text-gray-600 dark:hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/login" className="hover:text-gray-600 dark:hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/login" className="hover:text-gray-600 dark:hover:text-slate-300 transition-colors">
              Security Overview
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
