import { PasswordStrength } from '@/components/PasswordStrength'
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { FaXTwitter } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import useRegisterForm from './hooks/useRegisterForm'

export default function RegisterForm() {
  const { form, onSubmit } = useRegisterForm()
  return (
    <Container maw="responsive" miw={576}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to Mantine, register with
        </Text>

        <Group grow mb="md" mt="md">
          <Button leftSection={<FcGoogle size={24} />} variant="default" />
          <Button leftSection={<FaXTwitter size={24} />} variant="default" />
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={onSubmit}>
          <Stack>
            {/* <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            /> */}

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

            <PasswordStrength
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

            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue('terms', event.currentTarget.checked)
              }
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component={Link} c="dimmed" to="/login" size="xs">
              Already have an account? Login
            </Anchor>
            <Button type="submit" radius="xl">
              Register
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}
