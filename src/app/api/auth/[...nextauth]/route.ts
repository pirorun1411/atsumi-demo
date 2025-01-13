import NextAuth from 'next-auth';
import Auth0 from 'next-auth/providers/auth0';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Auth0({
      clientId: process.env.AUTH0_CLIENT_ID ?? '',
      clientSecret: process.env.AUTH0_CLIENT_SECRET ?? '',
      issuer: process.env.AUTH0_ISSUER ?? '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    // Credentialsは普通のIDパスワード方式
    CredentialsProvider({
      id: 'Credentials',
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        // ここでユーザー認証を行う
        // テスト用のユーザー
        const user = { id: '1', name: 'Taro', email: 'test@example.com', role: 'admin' };
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      // 注意: トークンをログ出力してはダメです。
      console.log('in jwt', { user, token, account, profile });

      if (user) {
        token.user = user;
        const u = user as any;
        token.role = u.role;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: ({ session, token }) => {
      console.log('in session', { session, token });
      token.accessToken;
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      };
    },
  },
});

export { handler as GET, handler as POST };
