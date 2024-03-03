import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { Outlet } from '@tanstack/react-router'
import AppHeader from './AppHeader/AppHeader'
import Navbar from './Navbar/Navbar'

export default function AppLayout() {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      layout="alt"
    >
      <Navbar />

      <AppShell.Main>
        <AppHeader>{null}</AppHeader>
        {/* <AppShell.Header>Header</AppShell.Header> */}
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
