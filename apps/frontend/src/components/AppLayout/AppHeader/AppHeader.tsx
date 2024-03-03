import {
  ActionIcon,
  AppShell,
  Flex,
  Group,
  TextInput,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core'
import { Anchor, Breadcrumbs } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { PropsWithChildren } from 'react'
import { FaRegBell } from 'react-icons/fa6'
import { FiCommand, FiSearch } from 'react-icons/fi'
import { LuPanelLeft } from 'react-icons/lu'
import { MdOutlineLightMode } from 'react-icons/md'
import classes from '../AppLayout.module.css'

export default function AppHeader({ children }: PropsWithChildren) {
  const items = [
    { title: 'Dashboard', href: '/test' },
    { title: 'Overview', href: '/' },
  ].map((item, index) => (
    <Anchor
      component={Link}
      to={item.href}
      key={index}
      className={classes.breadcrumbLink}
      preload={false}
      size="sm"
    >
      {item.title}
    </Anchor>
  ))
  return (
    <AppShell.Header>
      <Flex justify="space-between" h="100%" p="md">
        <Group gap="sm">
          <ActionIcon hiddenFrom="sm" c="dimmed" variant="transparent">
            <LuPanelLeft />
          </ActionIcon>
          <Breadcrumbs separator="›">{items}</Breadcrumbs>
        </Group>
        <Group gap="sm">
          <TextInput
            size="xs"
            leftSection={<FiSearch />}
            rightSection={<FiCommand />}
          />
          <ActionIcon
            c="var(--mantine-primary-color-contrast)"
            variant="transparent"
          >
            <MdOutlineLightMode />
          </ActionIcon>
          <ActionIcon
            c="var(--mantine-primary-color-contrast)"
            variant="transparent"
          >
            <FaRegBell />
          </ActionIcon>
        </Group>
      </Flex>
    </AppShell.Header>
  )
}
