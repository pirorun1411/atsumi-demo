'use client';

import * as React from 'react';

import { AppBar, Box, Toolbar, IconButton, Typography, Stack } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { useRouter } from 'next/navigation';
import { LinkComponent } from './headerLink';
import type { PageLink } from './headerType';
import AccountCircle from '@mui/icons-material/AccountCircle';

const pages: PageLink[] = [
  { title: 'title1', path: '/user' },
  { title: 'title2', path: '/user' },
  { title: 'title3', path: '/user' },
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
    <AppBar position='static' style={{ background: 'transparent', boxShadow: 'none' }} sx={{ height: 50 }}>
      <Toolbar disableGutters variant='dense'>
        <Box sx={{ ml: 3 }}>
          <IconButton onClick={handleClickHomeIcon}>
            <Typography variant='h6' component='div' color='primary'>
              App
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
        <Box sx={{ ml: 5 }}>
          <IconButton onClick={handleClickAccountIcon}>
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
