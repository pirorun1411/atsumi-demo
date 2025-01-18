'use client';

import { useSession } from 'next-auth/react';
import { Box, Container } from '@mui/material';

export default function User() {
  const { data: session, status } = useSession();
  const user = session?.user; // ログインしていなければnullになる。

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    >
      <Box>
        {user ? <Box>{`${JSON.stringify(user)}`} </Box> : <></>}
        {user ? 'ログインしています' : 'ログインしていません'}
      </Box>
    </Container>
  );
}
