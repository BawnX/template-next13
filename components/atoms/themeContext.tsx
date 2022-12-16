'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect
} from 'react'
const initialMode = 'light'

const getInitialColorMode = () => {
  const persistedPreferenceMode = localStorage.getItem('theme')
  const hasPersistedPreference = typeof persistedPreferenceMode === 'string'
  if (hasPersistedPreference) {
    return persistedPreferenceMode
  }

  const preference = matchMedia('(preference-color-scheme: dark)')
  const hasMediaQueryPreference = typeof preference.matches === 'boolean'

  if (hasMediaQueryPreference) {
    return preference.matches ? 'dark' : 'light'
  }

  return 'light'
}

const useLoaded = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])
  return loaded
}

export type ThemeContextType = {
  mode: string;
  handleTheme: (color?: string) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null)

export const useThemeContext = () => {
  const context = useContext(ThemeContext) as ThemeContextType

  if (!context) {
    console.error('Error deploying Language Context!!!')
  }

  return context
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') { return getInitialColorMode() }

    return initialMode
  })
  const loaded = useLoaded()
  useEffect(() => {
    if (mode === initialMode) {
      document.documentElement.setAttribute('class', 'light')
      localStorage.setItem('theme', 'light')
    }

    if (mode !== initialMode) {
      document.documentElement.setAttribute('class', 'dark')
      localStorage.setItem('theme', 'dark')
    }
  }, [mode])

  const handleTheme = (color?: string) => {
    if (color) {
      setMode(color)
      return
    }

    if (mode === initialMode) {
      setMode('dark')
      return
    }

    setMode('light')
  }

  const data = {
    mode,
    handleTheme
  }

  if (!loaded) { return null }

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
}

export default ThemeContext
