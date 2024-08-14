import { Container } from '(shared)/components/ui-kit/Container';
import { ArticlesList } from '../components/ArticlesList';
import { CreateArticleBlock } from './components/CreateArticleBlock';

export default async function Page() {
  return (
    <>
      <CreateArticleBlock />

      <section className="section">
        <Container className="relative">
          <h1 className="text-center mb-10">Усі статті</h1>

          <ArticlesList mode="admin" />
        </Container>
      </section>
    </>
  );
}
