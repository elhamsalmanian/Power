
import { AppContextProvider } from '../stores/appContext'
import { ThemeProvider } from 'next-themes'
import {fuchsia} from 'tailwindcss/colors'
import '../styles/globals.css'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <ThemeProvider attribute="class">      
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AppContextProvider>
      
    )
}

export default MyApp
