import React, { useState } from 'react'
import { User, Camera } from 'lucide-react'
import { toast } from 'sonner'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/features/auth/store'

export const ProfilePage: React.FC = () => {
  const { user, login, token } = useAuthStore()

  const [displayName, setDisplayName] = useState(user?.fullName || 'Manager')
  const [roleTitle, setRoleTitle] = useState(user?.role || 'Team Lead')
  const [email] = useState(user?.email || 'admin@teamresource.com')
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    setTimeout(() => {
      if (token && user) {
        login(token, {
          ...user,
          fullName: displayName,
          role: roleTitle,
        })
      }
      toast.success('Profile updated successfully!')
      setIsSaving(false)
    }, 400)
  }

  return (
    <Card className="max-w-2xl mx-auto p-6 md:p-8">
      <form onSubmit={handleSaveProfile} className="flex flex-col items-center">
        {/* Profile Avatar */}
        <div className="relative mb-4 group cursor-pointer">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-indigo-100 dark:bg-slate-700 flex items-center justify-center text-primary dark:text-indigo-400 border-4 border-white dark:border-slate-600 shadow-md">
            <User size={56} />
          </div>
          <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="text-white" size={24} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{displayName}</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-8">{roleTitle}</p>

        <div className="w-full space-y-4">
          <div>
            <Input
              label="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Sarah Connor"
              required
            />
          </div>

          <div>
            <Input
              label="Role Title"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="e.g. Lead Resource Manager"
              required
            />
          </div>

          <div>
            <Input
              label="Email Address"
              value={email}
              disabled
              helperText="Email cannot be changed directly."
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-2.5 mt-4"
            loading={isSaving}
          >
            Save Profile
          </Button>
        </div>
      </form>
    </Card>
  )
}
