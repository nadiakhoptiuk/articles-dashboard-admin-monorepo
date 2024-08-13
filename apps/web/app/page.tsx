import { Container } from '(shared)/components/ui-kit/Container';
import { ArticlesList } from './components/ArticlesList';

export default async function Home() {
  return (
    <section className="section">
      <Container>
        <h1 className="text-center mb-10">Міжнародні новини</h1>
        <p className="text-center mb-20">Радіо Свобода</p>

        <ArticlesList />
      </Container>
    </section>
  );
}
