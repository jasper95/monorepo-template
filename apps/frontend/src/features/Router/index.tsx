import Preloader from '@/components/Preloader'
import { routeTree } from '@/routeTree.gen'
import { trpc } from '@/utils/trpc'
import {
  ErrorComponent,
  RouterProvider,
  createRouter,
} from '@tanstack/react-router'

export const router = createRouter({
  routeTree,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  context: {
    session: null,
  },
})

export default function Router() {
  const { data, isLoading } = trpc.auth.session.useQuery()
  if (isLoading) {
    return <Preloader />
  }
  return (
    <RouterProvider
      router={router}
      context={{
        session: data?.session,
      }}
    />
  )
}
