import type { AppProps } from 'next/app'

// css
import '@/styles/globals.css'

// fonts
import "@fontsource/roboto/300.css";
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// ui
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import BaseTheme from '../Themes/ThemeConfig';

// provider
import { AuthProvider } from '../contexts/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={BaseTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}
