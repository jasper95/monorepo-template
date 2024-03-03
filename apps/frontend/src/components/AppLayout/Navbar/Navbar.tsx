import {
  AppShell,
  Avatar,
  Group,
  Menu,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  UnstyledButton,
  rem,
  useMantineTheme,
} from '@mantine/core'
import {
  IconChevronRight,
  IconHeart,
  IconLogout,
  IconMessage,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
} from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { FaInbox } from 'react-icons/fa6'
import classes from '../AppLayout.module.css'

const data = [
  { link: '', label: 'Dashboard', icon: FaInbox },
  { link: 'billing', label: 'Billing', icon: FaInbox },
  { link: 'security', label: 'Security', icon: FaInbox },
]
export default function Navbar() {
  const theme = useMantineTheme()
  return (
    <AppShell.Navbar withBorder p="md">
      <AppShell.Section>
        <Menu position="bottom-end">
          <Menu.Target>
            <UnstyledButton className={classes.user}>
              <Group>
                <Avatar
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                  radius="xl"
                  size={18}
                />

                <Stack gap={0}>
                  <Text size="sm" fw={500}>
                    Jasper Bernales
                  </Text>

                  <Text c="dimmed" size="xs">
                    bernalesjasper@gmail.com
                  </Text>
                </Stack>

                <IconChevronRight
                  style={{ width: rem(14), height: rem(14) }}
                  stroke={1.5}
                />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                <IconHeart
                  style={{ width: rem(16), height: rem(16) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              }
            >
              Liked posts
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconStar
                  style={{ width: rem(16), height: rem(16) }}
                  color={theme.colors.yellow[6]}
                  stroke={1.5}
                />
              }
            >
              Saved posts
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconMessage
                  style={{ width: rem(16), height: rem(16) }}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              }
            >
              Your comments
            </Menu.Item>

            <Menu.Label>Settings</Menu.Label>
            <Menu.Item
              leftSection={
                <IconSettings
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
            >
              Account settings
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconSwitchHorizontal
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
            >
              Change account
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconLogout
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
            >
              Logout
            </Menu.Item>

            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item
              leftSection={
                <IconPlayerPause
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
            >
              Pause subscription
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={
                <IconTrash
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
            >
              Delete account
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </AppShell.Section>
      <AppShell.Section grow component={ScrollArea}>
        {data.map((item) => (
          <NavLink
            className={classes.navLink}
            component={Link}
            to={item.link}
            key={item.label}
            preload={false}
            leftSection={<item.icon className={classes.navLinkIcon} />}
            label={item.label}
          />
        ))}
      </AppShell.Section>
      <AppShell.Section>Footer</AppShell.Section>
    </AppShell.Navbar>
  )
}
