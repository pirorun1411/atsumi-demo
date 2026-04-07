'use client';

import { Header } from '@/components/header/header';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../themes/Theme';

// eslint-disable-next-line import/no-default-export
export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main>{children}</main>
    </ThemeProvider>
  );
}
