export interface CalendarEvent {
  id: number
  title: string
  date: string
  type?: 'deadline' | 'meeting' | 'review'
}
