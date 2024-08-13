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

        const { email, password, mode } = credentials;

        const user = await fetch(`${process.env.API_BASE_URL}/users/${mode}`, {
          method: 'POST',
          body: JSON.stringify({ email: email, password: password }),
          headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json());

        if (user && user.userData.token) {
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
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    // const isAllowedToSignIn = true;
    // if (isAllowedToSignIn) {
    // } else {
    // Return false to display a default error message
    // return false;
    // Or you can return a URL to redirect to:
    // return '/unauthorized'
    // }
    // console.log('profile >>>>>>', profile);
    // console.log('email >>>>>>', email);
    // console.log('account >>>>>>', account);
    // console.log('credentials >>>>>>', credentials);
    // console.log('user >>>>>>', user);
    // return true;
    // },
    // },

    async jwt({ user, token }) {
      // console.log(token);

      if (user?.userData?.token) {
        token.email = user.userData.email;
        token.sub = user.userData.id;
        token.token = user.userData.token;
      }
      // console.log(token);

      return token;
    },
    async session({ token, session }) {
      session.user.jwt = token.token;
      // if (user?.userData?.token) {
      //   token.email = user.userData.email;
      //   token.sub = user.userData.id;
      //   token.token = user.userData.token;
      // }
      // console.log(token);

      return session;
    },
  },
};
