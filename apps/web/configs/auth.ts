import type { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

import { CustomUser, CustomUserSession } from '(shared)/types/common.types';

export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
        mode: { label: 'Mode', type: 'text', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password, mode } = credentials;

        const user = await fetch(`${process.env.API_BASE_URL}/users/${mode}`, {
          method: 'POST',
          body: JSON.stringify({ email: email, password: password }),
          headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json());

        if (user && user.userData.id) {
          return user as CustomUser;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    newUser: '/registration',
  },
  callbacks: {
    async jwt({ user, token }: { user: CustomUser; token: JWT }) {
      if (user?.userData?.token) {
        token.email = user.userData.email;
        token.sub = user.userData.id;
        token.token = user.userData.token;
      }

      return token;
    },
    async session({
      token,
      session,
    }: {
      token: JWT;
      session: CustomUserSession;
    }) {
      if (session.user) {
        session.user.jwt = token.token;
      }

      return session;
    },
  },
};
