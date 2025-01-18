'use client';

import * as React from 'react';

import Link from 'next/link';
import { Typography, Link as MuiLink } from '@mui/material';
import type { PageLink } from './headerType';

type Props = {
  page: PageLink;
};

export const LinkComponent = ({ page }: Props) => {
  return (
    <Link passHref href={page.path} legacyBehavior>
      <MuiLink underline='none'>
        <Typography variant='h6' component='div' color='primary' sx={{ fontSize: 14 }}>
          {page.title}
        </Typography>
      </MuiLink>
    </Link>
  );
};
