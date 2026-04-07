'use client';

import { useSession } from 'next-auth/react';
import {
  Box,
  Card,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Image from 'next/image';
import { Video } from '@/components/video';

export default function Poke() {
  const { data: session, status } = useSession();
  const user = session?.user; // ログインしていなければnullになる。

  const rows = [
    { info: 'データ数', newItem: '157', damagedItem: '532', psa10: '86' },
    { info: '直近価格', newItem: '550,000円', damagedItem: '210,000円', psa10: '1,500,000円' },
    { info: '平均価格', newItem: '633,000円', damagedItem: '383,480円', psa10: '2,170,982円' },

    { info: '最高価格', newItem: '5,000,000円', damagedItem: '2,250,000円', psa10: '8,000,000円' },
    { info: '最低価格', newItem: '14,500円', damagedItem: '3,800円', psa10: '480,000円' },
    {
      info: '騰落率(7日)',
      newItem: '-50,000円(-8.33%)',
      damagedItem: '-30,000円(-7.84%)',
      psa10: '-276,667円(-14.45%)',
    },
    {
      info: '騰落率(30日)',
      newItem: '-9,444円(-1.51%)',
      damagedItem: '15,492円(+4.59%)',
      psa10: '-559,321円(-25.45%)',
    },
  ];

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className='market'>
        <Video />
        <Container
          maxWidth='lg'
          sx={{
            position: 'absolute',
            top: 50,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.42)',
            boxShadow: 1,
            borderRadius: 2,
            p: 3,
            mt: 3,
          }}
        >
          <Stack spacing={2}>
            <Box
              sx={{
                alignContent: 'center',
                backgroundColor: '#ffffff',
                boxShadow: 1,
                borderRadius: 2,
                height: 'auto',
                width: 'auto',
                px: 2,
                py: 2,
              }}
            >
              <Box>リーリエ [SM4+ 119/114]</Box>
              <Stack
                direction={'row'}
                spacing={2}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Image
                  src='/poke_がんばリーリエ.jpg'
                  height={264.6}
                  width={189.7}
                  style={{ objectFit: 'contain' }}
                  alt='がんばリーリエ'
                />
                <TableContainer component={Paper} sx={{ maxWidth: 550 }} style={{ fontSize: 5 }}>
                  <Table
                    sx={{
                      '& .MuiTableCell-sizeMedium': {
                        padding: 1,
                        fontSize: 10,
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>キズあり</TableCell>
                        <TableCell>美品</TableCell>
                        <TableCell>PSA10</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.info}>
                          <TableCell>{row.info}</TableCell>
                          <TableCell>{row.newItem}</TableCell>
                          <TableCell>{row.damagedItem}</TableCell>
                          <TableCell>{row.psa10}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Card sx={{ width: 350, height: 260 }}></Card>
              </Stack>
            </Box>

            <Box sx={{ backgroundColor: '#ffffff', boxShadow: 1, borderRadius: 2, height: 300, width: 'auto' }}></Box>
            <Box sx={{ backgroundColor: '#ffffff', boxShadow: 1, borderRadius: 2, height: 300, width: 'auto' }}></Box>
            <Box sx={{ backgroundColor: '#ffffff', boxShadow: 1, borderRadius: 2, height: 300, width: 'auto' }}></Box>
            <Box sx={{ backgroundColor: '#ffffff', boxShadow: 1, borderRadius: 2, height: 300, width: 'auto' }}></Box>
          </Stack>
        </Container>
      </div>
    </>
  );
}
