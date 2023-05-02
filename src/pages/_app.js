import { createContext, useState } from 'react';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

export const ThemeContext = createContext();

export default function App({ Component, pageProps }) {
  const [admin, setAdmin] = useState(false);

  return (
    <ThemeContext.Provider value={{ admin, setAdmin }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeContext.Provider>
  );
}
