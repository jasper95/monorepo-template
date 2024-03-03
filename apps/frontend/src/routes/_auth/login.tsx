import LoginForm from '@/features/LoginForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/login')({
  component: LoginForm,
})
