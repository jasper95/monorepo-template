import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'

import { Link } from '@tanstack/react-router'
import { FaXTwitter } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import useLoginForm from './hooks/useLoginForm'

export default function LoginForm() {
  const { form, onSubmit } = useLoginForm()
  return (
    <Paper w="full" radius="md" p="xl" withBorder>
      <Text size="lg" fw={500}>
        Welcome to Mantine, login with
      </Text>

      <Group grow mb="md" mt="md">
        <Button leftSection={<FcGoogle size={24} />} variant="default" />
        <Button leftSection={<FaXTwitter size={24} />} variant="default" />
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={
              form.errors.password &&
              'Password should include at least 6 characters'
            }
            radius="md"
          />
        </Stack>
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component={Link} to="/forgot-password" size="sm">
            Forgot password?
          </Anchor>
        </Group>

        <Group justify="space-between" mt="xl">
          <Anchor component={Link} c="dimmed" to="/register" size="xs">
            Don't have an account? Register
          </Anchor>
          <Button type="submit" radius="xl">
            Login
          </Button>
        </Group>
      </form>
    </Paper>
  )
}
