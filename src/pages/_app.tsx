import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme';
import ErrorBoundary from '@/components/ErrorBoundary';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

function App({ Component, pageProps, signOut, user }: AppProps & {
  signOut?: () => void;
  user?: { username: string; attributes: Record<string, any> };
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Layout user={user} onSignOut={signOut}>
          <Component {...pageProps} />
        </Layout>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default withAuthenticator(App);