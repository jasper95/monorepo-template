import RegisterForm from '@/features/RegisterForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/register')({
  component: RegisterForm,
})
