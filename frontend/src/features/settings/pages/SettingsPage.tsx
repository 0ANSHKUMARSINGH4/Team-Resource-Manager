import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Bell, Key, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { Card } from '@/components/ui/Card'
import { useAuthStore } from '@/features/auth/store'

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  const handleSignOut = () => {
    logout()
    toast.info('Signed out successfully')
    navigate('/login')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white">System Settings</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Manage your account security and preferences
          </p>
        </div>

        <div className="p-6 space-y-4">
          {/* Account Security */}
          <div className="p-4 bg-indigo-50/60 dark:bg-slate-700/30 rounded-xl flex items-center justify-between gap-4 border border-indigo-100/50 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-white dark:bg-slate-700 rounded-lg text-primary shadow-sm">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white text-sm">Account Security</h4>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  Password last updated 30 days ago
                </p>
              </div>
            </div>
            <button
              onClick={() => toast.info('Password update flow will be available in Phase 2')}
              className="text-xs font-semibold text-primary hover:text-indigo-600 px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-white dark:hover:bg-slate-700 transition-colors"
            >
              Update Password
            </button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="p-4 bg-gray-50 dark:bg-slate-700/20 rounded-xl flex items-center justify-between gap-4 border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-white dark:bg-slate-700 rounded-lg text-gray-600 dark:text-slate-300 shadow-sm">
                <Key size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white text-sm">Two-Factor Authentication</h4>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <button
              onClick={() => toast.info('2FA setup will be available in Phase 2')}
              className="text-xs font-semibold text-gray-600 dark:text-slate-300 hover:text-gray-900 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 transition-colors"
            >
              Enable 2FA
            </button>
          </div>

          {/* Notifications */}
          <div className="p-4 bg-gray-50 dark:bg-slate-700/20 rounded-xl flex items-center justify-between gap-4 border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-white dark:bg-slate-700 rounded-lg text-gray-600 dark:text-slate-300 shadow-sm">
                <Bell size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white text-sm">Email Notifications</h4>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  Receive email digests of resource milestones
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
            />
          </div>

          {/* Sign Out */}
          <div
            onClick={handleSignOut}
            className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors border border-red-100 dark:border-red-900/20"
          >
            <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg text-red-500 shadow-sm">
              <LogOut size={20} />
            </div>
            <div>
              <h4 className="font-bold text-red-600 dark:text-red-400 text-sm">Sign Out</h4>
              <p className="text-xs text-red-500/80 dark:text-red-400/70">
                Log out of your current session securely
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
