'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function User() {
  const { data: session, status } = useSession();
  const user = session?.user; // ログインしていなければnullになる。
  const router = useRouter();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    >
      <div>
        {user ? <div>{`${JSON.stringify(user)}`}</div> : <></>}
        {user ? <div>ログインしています</div> : <div>ログインしていません</div>}
      </div>
      <button
        onClick={() => {
          router.push('/');
        }}
      >
        HOME画面へ
      </button>
    </main>
  );
}
