import { Button, Slider, Text } from '@mantine/core'
import { ActionIcon } from '@mantine/core'
import { Divider } from '@mantine/core'
import { IconPhoto } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

const key = '/_app'
export const Route = createFileRoute(key)({
  component: Home,
})
function Home() {
  const [value, setValue] = useState(0)
  return <Button variant="filled">Tset</Button>
  return (
    <div>
      Home
      <Slider
        color="blue"
        value={value}
        step={1}
        min={0}
        max={9}
        onChange={setValue}
        marks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => ({
          label: e,
          value: e,
        }))}
      />
      <Text>Text with blue.9 color</Text>
      <Divider />
      <ActionIcon variant="default">
        <IconPhoto style={{ width: '70%', height: '70%' }} />
      </ActionIcon>
      <Button size="xs" variant="default">
        Button
      </Button>
    </div>
  )
}
