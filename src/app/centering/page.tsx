'use client';

import { useSession } from 'next-auth/react';
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { SimpleCard } from '@/components/card';
import { PsaContent } from '@/components/cardContents/psaContent';

export default function Centering() {
  const [inputData, setInputDate] = useState({ top: 0, bottom: 0, left: 0, right: 0 });
  const [topBottomRatio, setTopBottomRatio] = useState('');
  const [leftRightRatio, setLeftRightRatio] = useState('');
  const { data: session, status } = useSession();
  const user = session?.user; // ログインしていなければnullになる。

  const ratioCalc = (firstNum: number, secondNum: number) => {
    let firstResult = (firstNum / (firstNum + secondNum)) * 100;
    firstResult = Math.round(firstResult * 1000) / 1000;
    const secondResult = 100 - firstResult;
    const ratioResult = `${String(firstResult)} : ${String(secondResult)}`;
    return ratioResult;
  };

  useEffect(() => {
    if (inputData.top === 0) {
      if (inputData.bottom === 0) {
        setTopBottomRatio('topとbottomを入力してください');
      } else {
        setTopBottomRatio('topを入力してください');
      }
    } else if (inputData.bottom === 0) {
      setTopBottomRatio('bottomを入力してください');
    } else {
      setTopBottomRatio(ratioCalc(inputData.top, inputData.bottom));
    }

    if (inputData.left === 0) {
      if (inputData.right === 0) {
        setLeftRightRatio('leftとrightを入力してください');
      } else {
        setLeftRightRatio('leftを入力してください');
      }
    } else if (inputData.right === 0) {
      setLeftRightRatio('rightを入力してください');
    } else {
      setLeftRightRatio(ratioCalc(inputData.left, inputData.right));
    }
  }, [inputData]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className=''>
        <Container
          maxWidth='lg'
          sx={{
            backgroundColor: '#ffffffff',
            boxShadow: 2,
            borderRadius: 2,
            p: 3,
            mt: 3,
            color: '#ffffff',
          }}
        >
          <Stack
            direction={'column'}
            spacing={5}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Stack direction='row' justifyContent='flex-end' sx={{ width: '100%', color: '#7f5af0' }}>
              <Button
                variant='outlined'
                size='medium'
                startIcon={<RestartAltIcon />}
                onClick={() => {
                  setInputDate({ top: 0, bottom: 0, left: 0, right: 0 });
                }}
                sx={{ color: '#7f5af0' }}
              >
                リセット
              </Button>
            </Stack>
            <TextField
              type='number'
              sx={{ width: 250 }}
              label='上'
              value={inputData.top}
              onChange={(e) => {
                setInputDate({ ...inputData, top: Number(e.target.value) });
              }}
            />
            <Stack
              direction={'row'}
              spacing={5}
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextField
                type='number'
                label='左'
                value={inputData.left}
                onChange={(e) => {
                  setInputDate({ ...inputData, left: Number(e.target.value) });
                }}
              />
              <Image src='/pika.jpg' height={264.6} width={189.7} style={{ objectFit: 'contain' }} alt='ピカチュウ' />
              <TextField
                type='number'
                label='右'
                value={inputData.right}
                onChange={(e) => {
                  setInputDate({ ...inputData, right: Number(e.target.value) });
                }}
              />
            </Stack>

            <TextField
              type='number'
              sx={{ width: 250 }}
              label='下'
              value={inputData.bottom}
              onChange={(e) => {
                setInputDate({ ...inputData, bottom: Number(e.target.value) });
              }}
            />
            <Box>
              <Stack direction='row' spacing={2} sx={{ color: 'red' }}>
                <Typography>上下比率</Typography>
                <Typography>{topBottomRatio}</Typography>
              </Stack>
            </Box>
            <Box>
              <Stack direction='row' spacing={2} sx={{ color: 'red' }}>
                <Typography>左右比率</Typography>
                <Typography>{leftRightRatio}</Typography>
              </Stack>
            </Box>
          </Stack>
        </Container>
        <div className='card'>
          <div className='left-card'>
            <SimpleCard title={'センタリグについて'} content={<PsaContent />} />
          </div>
          <div className='right-card'>
            <SimpleCard />
          </div>
        </div>
      </div>
    </>
  );
}
