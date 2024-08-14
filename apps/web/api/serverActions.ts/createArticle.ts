'use server';

import { authConfig } from '@/configs/auth';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import {
  CreateArticleFormType,
  CustomUserSession,
} from '(shared)/types/common.types';
import { ROUTES } from '(shared)/types/enums';

export const createArticle = async (data: CreateArticleFormType) => {
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

  if (res.status === 200) revalidatePath(ROUTES.ADMIN, 'layout');

  return res.status;
};
