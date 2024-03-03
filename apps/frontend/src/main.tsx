import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/utils/dayjs'

import Router from '@/features/Router'
import RootProvider from './features/Providers'
import showVersion from './utils/version'

import '@/assets/styles/global.css'
import '@fontsource/inter/latin.css'
import '@mantine/core/styles.layer.css'
import '@mantine/dates/styles.css'

const element = document.getElementById('root')!

showVersion()

if (!element.innerHTML) {
  ReactDOM.createRoot(element).render(
    <React.StrictMode>
      <RootProvider>
        <Router />
      </RootProvider>
    </React.StrictMode>,
  )
}
