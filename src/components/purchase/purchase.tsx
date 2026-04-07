'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button, Container, Modal } from '@mui/material';
import { DataGrid, type GridColDef, type GridRowsProp } from '@mui/x-data-grid';
import { AddPurchaseModal } from './addPurchaseModal';

type Props = {
  initialData: GridRowsProp;
};

export const PurchaseClient = ({ initialData }: Props) => {
  console.log('initialData', initialData);
  const { data: session, status } = useSession();
  const [data, setData] = useState(initialData);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const user = session?.user; // ログインしていなければnullになる。

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'No', width: 60 },
    { field: 'productName', headerName: '商品名', width: 360 },
    { field: 'supplier', headerName: '仕入先', width: 110 },
    { field: 'purchasePrice', headerName: '仕入価格', width: 125 },
    { field: 'customer', headerName: '販売先', width: 110 },
    { field: 'sellingPrice', headerName: '販売価格', width: 125 },
    { field: 'commission', headerName: '手数料', width: 80 },
    { field: 'shippingCost', headerName: '送料', width: 80 },
    { field: 'profit', headerName: '利益', width: 125 },
    { field: 'profitMargin', headerName: '利益率', width: 80 },
    { field: 'status', headerName: 'ステータス', width: 100 },
    // 削除ボタン
    {
      field: 'deleteBtn',
      headerName: '削除',
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <Button variant='contained' color='primary'>
          削除
        </Button>
      ),
    },
    // 編集ボタン
    {
      field: 'editBtn',
      headerName: '詳細',
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <Button variant='contained' color='primary'>
          編集
        </Button>
      ),
    },
  ];

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Button variant='outlined' size='medium' onClick={handleOpenModal}>
        新規追加
      </Button>
      <Modal open={isOpenModal} onClose={handleCloseModal}>
        <AddPurchaseModal handleCloseModal={handleCloseModal} />
      </Modal>
      <Container
        fixed
        maxWidth='xl'
        disableGutters
        sx={{
          position: 'absolute',
          right: 0,
          left: 0,
          boxShadow: 1,
          borderRadius: 2,
          mt: 3,
        }}
      >
        <DataGrid columns={columns} rows={data} showCellVerticalBorder />
      </Container>
    </>
  );
};
