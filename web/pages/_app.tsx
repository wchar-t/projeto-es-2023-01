import { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import '@/styles/globals.css';
import '@/styles/theme.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import theme from '@/theme';
import Api from '@/lib/api';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const { error, result } = await Api.getSession();

      Api.session = !error ? result : null;
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return <div> </div>;
  }

  return (
    <ChakraProvider theme={theme}>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}
