import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const Footer = () => {
  return (
    <>
      <AppBar component='footer' position='static' sx={{ backgroundColor: '#000000', height: '300px' }}>
        <Container maxWidth='md'>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='caption'>©2023 engr-sng</Typography>
          </Box>
        </Container>
      </AppBar>
    </>
  );
};
