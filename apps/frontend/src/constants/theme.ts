import { CSSVariablesResolver, DEFAULT_THEME, createTheme } from '@mantine/core'
console.log('DEFAULT_THEME: ', DEFAULT_THEME)

export const theme = createTheme({
  fontFamily: 'Inter',
  headings: {
    fontFamily: 'Inter',
  },
  primaryColor: 'accent',
  other: {
    bgDark: '#191A23',
  },
  primaryShade: 7,
  colors: {
    ...DEFAULT_THEME.colors,
    accent: [
      '#f3edff',
      '#e0d7fa',
      '#beabf0',
      '#9a7ce6',
      '#7c56de',
      '#683dd9',
      '#5f2fd8',
      '#4f23c0',
      '#451eac',
      '#3a1899',
    ],
    text: [
      '#f3f3ff',
      '#e5e5ee',
      '#c9c9d5',
      '#abacba',
      '#9192a3',
      '#818296',
      '#797a90',
      '#67687e',
      '#5b5d72',
      '#4d4f67',
    ],
    // dark: [
    //   '#D2D3E0',
    //   '#b8b8b8',
    //   '#858699',
    //   '#D2D3E0',
    //   '#313248',
    //   '#2b2c44',
    //   '#272939',
    //   '#191A23',
    //   '#262736',
    //   '#858699',
    // ],
    //   [
    //     "#C9C9C9",
    //     "#b8b8b8",
    //     "#828282",
    //     "#696969",
    //     "#424242",
    //     "#3b3b3b",
    //     "#2e2e2e",
    //     "#242424",
    //     "#1f1f1f",
    //     "#141414"
    // ]
  },
})

export const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {},
  dark: {
    '--mantine-color-icon-default': theme.colors.dark[9],
    '--mantine-color-white': '#EEEFFC',
  },
})
