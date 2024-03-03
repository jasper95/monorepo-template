import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import type { Session } from 'lucia'

interface RouterRootContext {
  session: Session | null
}

export const Route = createRootRouteWithContext<RouterRootContext>()({
  component: RootRoute,
})

function RootRoute() {
  return (
    <>
      <Outlet />
      <ReactQueryDevtools position="top" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
