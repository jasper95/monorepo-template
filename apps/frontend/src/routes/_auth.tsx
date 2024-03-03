import { Stack } from '@mantine/core'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
  beforeLoad: ({ context }) => {
    if (context.session) {
      throw redirect({
        to: '/',
      })
    }
  },
})

function AuthLayout() {
  return (
    <Stack gap={0} bg={'gray.2'}>
      <Stack p={24} mih={'100vh'} align="center" justify="center">
        <Outlet />
      </Stack>
    </Stack>
  )
}
