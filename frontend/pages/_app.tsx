import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { supabase } from '../lib/supabase';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/home.css';
import '../styles/wizard.css';

export default function App({ Component, pageProps }: AppProps) {



  return <>
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: 'var(--bg-gradient)' }} />
    <Component {...pageProps} />
    <Analytics />
    <SpeedInsights />
  </>;
}
