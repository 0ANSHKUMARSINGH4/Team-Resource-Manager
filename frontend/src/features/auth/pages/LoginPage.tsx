import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { ArrowRight } from 'lucide-react'
import { login as loginApi } from '../api'
import { useAuthStore } from '../store'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    try {
      const response = await loginApi(data)
      login(response.token, response.user)
      toast.success(`Welcome back, ${response.user.fullName}!`)
      navigate('/dashboard')
    } catch (err: unknown) {
      // In local dev without backend running, allow demo login fallback
      const error = err as { response?: { data?: { message?: string } } }
      const msg = error.response?.data?.message || 'Failed to login. Please check your credentials.'
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoCredentials = () => {
    setValue('email', 'admin@trm.com')
    setValue('password', 'admin123')
  }

  return (
    <div className="min-h-screen bg-[#F8F9FD] dark:bg-slate-900 flex items-center justify-center p-4 transition-colors">
      <div className="w-full max-w-md">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 bg-gradient-to-br from-primary to-indigo-700 rounded-xl items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 text-sm mb-3">
            TRM
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Team Resource Manager
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            Sign in to manage your team resources
          </p>
        </div>

        <Card className="p-8 shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Input
                label="Email Address"
                type="email"
                placeholder="you@company.com"
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-2.5 mt-2"
              loading={isLoading}
            >
              Sign In <ArrowRight size={16} />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-700 text-center space-y-3">
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-primary hover:text-indigo-600 transition-colors"
              >
                Create one now
              </Link>
            </p>

            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-xs text-indigo-500 hover:text-indigo-600 underline"
            >
              Fill demo credentials
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
