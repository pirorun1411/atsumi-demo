import { type JSX } from '@emotion/react/jsx-runtime';
import { Card, CardContent, CardActions, Typography, Button, CardHeader } from '@mui/material'; // 必要なコンポーネントをインポートします

type Props = {
  title?: string;
  content?: JSX.Element | string;
};

export const SimpleCard = ({ title = 'タイトル', content = '内容' }: Props) => {
  return (
    <Card variant='outlined' sx={{ mt: 3, mb: 3, ml: 10, mr: 10, maxWidth: 900, gap: 2 }}>
      <CardContent>
        <CardHeader title={title} />
        {content}
      </CardContent>
      <CardActions>
        <Button size='small'>button</Button>
      </CardActions>
    </Card>
  );
};
