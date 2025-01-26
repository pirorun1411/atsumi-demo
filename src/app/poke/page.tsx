'use client';

import { useSession } from 'next-auth/react';
import { Container } from '@mui/material';
import { Header } from '@/components/header/header';

export default function Poke() {
  const { data: session, status } = useSession();
  const user = session?.user; // ログインしていなければnullになる。

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <>
      <video
        autoPlay
        loop
        playsInline
        muted
        className='pointer-events-none object-cover'
        width='100%'
        height='100%'
        style={{
          position: 'absolute',
          zIndex: -1,
          objectFit: 'fill',
        }}
      >
        <source src='/AMV - Imagine.mp4' type='video/mp4' />
      </video>
      <Header />
      <Container></Container>
    </>
  );
}
