import { FC } from 'react';

import { Logo } from '(shared)/components/ui-kit/Logo';
import { Container } from '(shared)/components/ui-kit/Container';

export const Header: FC = () => {
  return (
    <header className="relative py-10" role="banner">
      <Container className="flex items-center justify-between">
        <Logo />
        <p className="font-comfortaa">header</p>
        {/* <Navbar /> */}
      </Container>
    </header>
  );
};
