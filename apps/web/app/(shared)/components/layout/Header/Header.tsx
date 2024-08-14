import { FC } from 'react';

import { Container } from '(shared)/components/ui-kit/Container';
import { NavBar } from '(shared)/components/navigation/NavBar';

export const Header: FC = () => {
  return (
    <header
      className="header fixed z-[1] w-full left-0 top-0 py-10 bg-white base-shadow"
      role="banner"
    >
      <Container className="flex items-center justify-between">
        <NavBar />
      </Container>
    </header>
  );
};
