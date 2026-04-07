import { Typography, Button, Box, Stack } from '@mui/material'; // 必要なコンポーネントをインポートします

type Props = {
  handleCloseModal: () => void;
};

export const AddPurchaseModal = ({ handleCloseModal }: Props) => {
  console.log('modal');
  return (
    <Box
      sx={{
        padding: '10px',
        margin: '30px auto',
        width: '70%',
        backgroundColor: 'white',
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
        <Typography variant='h6' component='h4'>
          テストモーダル
        </Typography>
        <Button variant='contained' onClick={handleCloseModal}>
          閉じる
        </Button>
      </Stack>
    </Box>
  );
};
