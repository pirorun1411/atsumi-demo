import { Container } from '@mui/material';
import { getServerSession } from 'next-auth/next';
import { Video } from '@/components/video';
import { Footer } from '@/components/footer/footer';

export const Home = async () => {
  const session = await getServerSession();

  console.log(session);
  return (
    <>
      {/* <body className='body'> */}
      {/* <Video /> */}
      <div className='content'>
        <Video />
        <Container maxWidth={false} sx={{ backgroundColor: '#121212', height: 1500, width: '100%' }} />
        {/* <Container>
          <h1>Home画面</h1>
        </Container> */}
        <Footer />
      </div>
      {/* </body> */}
    </>
  );
};

export default Home;
