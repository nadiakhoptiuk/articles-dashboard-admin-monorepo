import { SearchParamsType } from '(shared)/types/common.types';

export const getAllArticles = async (searchParams: SearchParamsType) => {
  const { sort, page, category } = searchParams;

  let categoryQueryString = '';
  const categoryArray = [];
  if (category && !Array.isArray(category)) {
    categoryArray.push(category);
  }

  if (category && Array.isArray(category)) {
    category.forEach(el => categoryArray.push(el));
  }

  categoryArray.forEach(category => {
    categoryQueryString += `&category=${category.replace(' ', '+')}`;
  });

  const res = await fetch(
    `${process.env.API_BASE_URL}/articles?sort=${sort}&page=${page}${categoryQueryString}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (res.status !== 200)
    return { articles: [], count: 0, error: 'Не вдалось отримати результати' };
  if (res.status === 200) return res.json().then(res => res.data);
};
