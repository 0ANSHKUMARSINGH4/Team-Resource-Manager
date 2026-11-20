import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { ArrowRight } from 'lucide-react'
import { register as registerApi } from '../api'
import { useAuthStore } from '../store'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true)
    try {
      const response = await registerApi({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      })
      login(response.token, response.user)
      toast.success('Account created successfully! Welcome to TRM.')
      navigate('/dashboard')
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } }
      const msg = error.response?.data?.message || 'Registration failed. Please try again.'
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FD] dark:bg-slate-900 flex items-center justify-center p-4 transition-colors">
      <div className="w-full max-w-md">
        {/* Back to Homepage */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
          >
            ← Back to Homepage
          </Link>
        </div>

        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 bg-gradient-to-br from-primary to-indigo-700 rounded-xl items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 text-sm mb-3">
            TRM
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create an Account</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            Get started with Team Resource Manager
          </p>
        </div>

        <Card className="p-8 shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                label="Full Name"
                placeholder="Sarah Connor"
                error={errors.fullName?.message}
                {...register('fullName')}
              />
            </div>

            <div>
              <Input
                label="Email Address"
                type="email"
                placeholder="sarah@company.com"
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

            <div>
              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-2.5 mt-2"
              loading={isLoading}
            >
              Sign Up <ArrowRight size={16} />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-700 text-center">
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary hover:text-indigo-600 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
