'use client';

import * as React from 'react';

import { AppBar, Box, Toolbar, IconButton, Typography, Stack } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { useRouter } from 'next/navigation';
import { LinkComponent } from './headerLink';
import type { PageLink } from './headerType';
import AccountCircle from '@mui/icons-material/AccountCircle';

const pages: PageLink[] = [
  { title: 'センタリング', path: '/centering' },
  { title: '相場', path: '/poke' },
  { title: '仕入れ', path: '/purchase' },
  { title: 'title4', path: '/user' },
  { title: 'title5', path: '/user' },
];

export const Header = () => {
  const router = useRouter();

  const handleClickHomeIcon = () => {
    router.push('/');
  };

  const handleClickAccountIcon = () => {
    router.push('/user');
  };

  return (
    <AppBar style={{ position: 'sticky', background: 'transparent', boxShadow: 'none' }} sx={{ height: 50 }}>
      <Toolbar disableGutters variant='dense'>
        <Box sx={{ ml: 3 }}>
          <IconButton onClick={handleClickHomeIcon} color='primary'>
            <Typography variant='h5' component='div' color='primary'>
              App for Myself
            </Typography>
            <CatchingPokemonIcon />
          </IconButton>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction={'row'} spacing={5} sx={{ mr: 20 }}>
          {pages.map((page) => (
            <LinkComponent page={page} key={page.title} />
          ))}
        </Stack>
        <Box sx={{ mr: 3 }}>
          <IconButton onClick={handleClickAccountIcon} color='primary'>
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
