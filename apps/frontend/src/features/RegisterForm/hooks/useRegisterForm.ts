import { strongPasswordSchema } from '@/components/PasswordStrength'
import { trpc } from '@/utils/trpc'
import { useForm, zodResolver } from '@mantine/form'
import * as zod from 'zod'

const schema = zod.object({
  email: zod.string().email(),
  terms: zod.boolean(),
  password: strongPasswordSchema,
})

export type TRegisterForm = zod.infer<typeof schema>
export default function useRegisterForm() {
  const mutation = trpc.auth.signup.useMutation()

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: '',
      password: '',
      terms: false,
    },
  })

  const onSubmit = form.onSubmit(async (data) => {
    await mutation.mutateAsync(data)
  })

  return {
    form,
    onSubmit,
  }
}
