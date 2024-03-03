import { trpc } from '@/utils/trpc'
import { useForm, zodResolver } from '@mantine/form'
import * as zod from 'zod'

const schema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
})

export type TLoginForm = zod.infer<typeof schema>
export default function useLoginForm() {
  const mutation = trpc.auth.login.useMutation()

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = form.onSubmit(async (data) => {
    try {
      await mutation.mutateAsync(data)
    } catch (e: any) {
      if (e.response.data.code === 2) {
        form.setFieldError('email', 'User not found')
      }

      if (e.response.data.code === 6) {
        form.setFieldError('password', 'Wrong password')
      }
    }
  })

  return {
    form,
    onSubmit,
  }
}
