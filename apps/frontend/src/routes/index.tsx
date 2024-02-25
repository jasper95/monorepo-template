import Preloader from '@/components/Preloader'
import { trpc } from '@/utils/trpc'
import { Fragment, Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { AppRouter } from './app.router'
import { AuthRouter } from './auth.router'

export default function Router() {
  // const { isLoading, data } = trpc.auth.session.useQuery(undefined, {
  //   enabled: false,
  // })

  const getRouter = () => {
    if (true) return AuthRouter
    return AppRouter
  }

  // if (false) return <Preloader />
  return (
    <Suspense fallback={<Fragment />}>
      <RouterProvider router={getRouter()} />
    </Suspense>
  )
}
