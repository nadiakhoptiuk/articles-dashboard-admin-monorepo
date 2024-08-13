import type { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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

        const { email, password, mode, ...other } = credentials;

        const user = await fetch(`${process.env.BACKEND_URL}/users/${mode}`, {
          method: 'POST',
          body: JSON.stringify({ email: email, password: password }),
          headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json());

        if (user && user.userData.id) {
          return user as User;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    newUser: '/registration',
  },
};
