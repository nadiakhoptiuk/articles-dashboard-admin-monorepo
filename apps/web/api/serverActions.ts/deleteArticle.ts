'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

import { authConfig } from '@/configs/auth';

import { ROUTES } from '(shared)/types/enums';
import { CustomUserSession } from '(shared)/types/common.types';

export const deleteArticle = async (id: string) => {
  const session: CustomUserSession | null = await getServerSession(authConfig);

  if (!session) return 401;

  const res = await fetch(`${process.env.API_BASE_URL}/articles/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user?.jwt}`,
    },
  });

  if (res.status === 200) revalidatePath(ROUTES.ADMIN, 'layout');

  return res.status;
};
