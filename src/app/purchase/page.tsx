'use server';

import { type GridRowsProp } from '@mui/x-data-grid';
import { PurchaseClient } from '@/components/purchase/purchase';

type PurchaseItem = {
  id: string;
  productName?: string;
  supplier?: string;
  purchasePrice?: string;
  customer?: string;
  sellingPrice?: string;
  commission?: string;
  shippingCost?: string;
  profit?: string;
  profitMargin?: string;
  status?: string;
};

export default async function Purchase() {
  // ssrでデータ取得
  let initialData: GridRowsProp = [];

  try {
    const response = await fetch('http://localhost:3000/api/purchase');
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const purchases = (await response.json()) as PurchaseItem[];

    initialData = purchases.map((item: PurchaseItem) => ({
      id: Number(item.id),
      productName: item.productName,
      supplier: item.supplier,
      purchasePrice: item.purchasePrice,
      customer: item.customer,
      sellingPrice: item.sellingPrice,
      commission: item.commission,
      shippingCost: item.shippingCost,
      profit: item.profit,
      profitMargin: item.profitMargin,
      status: item.status,
    }));
  } catch (error) {
    console.error('Failed to fetch data from API:', error);
    // フォールバックとして空のデータを設定
  }

  return (
    <>
      <PurchaseClient initialData={initialData} />
    </>
  );
}
