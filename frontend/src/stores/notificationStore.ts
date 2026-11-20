import { create } from 'zustand'

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read: boolean
  icon?: string
}

interface NotificationState {
  notifications: Notification[]
  isOpen: boolean
  unreadCount: number

  // Actions
  toggle: () => void
  open: () => void
  close: () => void
  addNotification: (n: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

let counter = 0

// Seed some initial notifications so the bell icon shows activity
const seedNotifications: Notification[] = [
  {
    id: 'seed-1',
    type: 'success',
    title: 'New Employee Onboarded',
    message: 'Sarah Chen has been added to the Engineering department.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
  },
  {
    id: 'seed-2',
    type: 'info',
    title: 'Project Deadline Approaching',
    message: 'Platform Redesign Q4 is due in 3 days.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: 'seed-3',
    type: 'warning',
    title: 'Budget Alert',
    message: 'Marketing department has used 85% of quarterly budget.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
  },
  {
    id: 'seed-4',
    type: 'success',
    title: 'Sprint Completed',
    message: 'Sprint 12 finished with 94% velocity achieved.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true,
  },
  {
    id: 'seed-5',
    type: 'info',
    title: 'System Update',
    message: 'TRM v2.0 has been deployed with new features.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
  },
]

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: seedNotifications,
  isOpen: false,
  unreadCount: seedNotifications.filter((n) => !n.read).length,

  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),

  addNotification: (n) => {
    counter += 1
    const notification: Notification = {
      ...n,
      id: `notif-${Date.now()}-${counter}`,
      timestamp: new Date(),
      read: false,
    }
    set((s) => ({
      notifications: [notification, ...s.notifications],
      unreadCount: s.unreadCount + 1,
    }))
  },

  markAsRead: (id) => {
    const { notifications } = get()
    const target = notifications.find((n) => n.id === id)
    if (target && !target.read) {
      set((s) => ({
        notifications: s.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, s.unreadCount - 1),
      }))
    }
  },

  markAllAsRead: () => {
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }))
  },

  removeNotification: (id) => {
    const { notifications } = get()
    const target = notifications.find((n) => n.id === id)
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
      unreadCount: target && !target.read ? Math.max(0, s.unreadCount - 1) : s.unreadCount,
    }))
  },

  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}))
