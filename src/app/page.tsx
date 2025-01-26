import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { LoginButton, LogoutButton } from '../components/buttons';
import { Header } from '@/components/header/header';
import { Video } from '@/components/video';

export const Home = async () => {
  const session = await getServerSession();

  console.log(session);
  return (
    <>
      <Video />
      <div className='content'>
        <Header />
        <Container>
          <h1>Home画面</h1>
          <Stack>
            <Box p={2}>
              <Link href='/user'>ユーザー画面へ</Link>
            </Box>
            <Box p={2}>{session?.user ? <LogoutButton /> : <LoginButton />}</Box>
            <Box p={2}>
              <h3>MUI実装</h3>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label='Label' />
                <FormControlLabel required control={<Checkbox />} label='Required' />
                <FormControlLabel disabled control={<Checkbox />} label='Disabled' />
              </FormGroup>
              <hr />
              <Button variant='contained' color='primary'>
                ボタン
              </Button>
            </Box>
          </Stack>
        </Container>
      </div>
    </>
  );
};

export default Home;
