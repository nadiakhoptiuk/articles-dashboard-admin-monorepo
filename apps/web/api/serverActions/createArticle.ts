'use server';

import { authConfig } from '@/configs/auth';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import {
  ArticleFormType,
  CustomUserSession,
} from '(shared)/types/common.types';
import { ROUTES } from '(shared)/types/enums';

export const createArticle = async (data: ArticleFormType) => {
  const session: CustomUserSession | null = await getServerSession(authConfig);

  if (!session) return 401;

  const res = await fetch(`${process.env.API_BASE_URL}/articles/`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user?.jwt}`,
    },
  });

  if (res.status === 201) revalidatePath(ROUTES.ADMIN, 'page');

  return res.status;
};
