import { Metadata } from 'next';

import { Container } from '(shared)/components/ui-kit/Container';
import { ArticlesList } from '../components/ArticlesList';
import { CreateArticleBlock } from './components/CreateArticleBlock';

import { SearchParamsPropsType } from '(shared)/types/common.types';

export const metadata: Metadata = {
  title: 'Сайт свіжих новин | Панель адміністратора',
};

export default async function Page({ searchParams }: SearchParamsPropsType) {
  return (
    <>
      <CreateArticleBlock />

      <section className="section">
        <Container className="relative">
          <h1 className="text-center mb-10 md:mb-15 xl:mb-20">Усі статті</h1>

          <ArticlesList mode="admin" searchParams={searchParams} />
        </Container>
      </section>
    </>
  );
}
