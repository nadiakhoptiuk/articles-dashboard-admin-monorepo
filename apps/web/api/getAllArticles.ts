export const getAllArticles = async () => {
  const res = await fetch(`${process.env.API_BASE_URL}/articles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json().then(res => res.data);
};
