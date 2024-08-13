import { AuthForm } from '(shared)/components/forms/AuthForm';
import { ChangeFormTypeButton } from '(shared)/components/ui-kit/ChangeFormTypeButton';
import { Container } from '(shared)/components/ui-kit/Container';

import { AUTH_TYPES } from '(shared)/types/enums';

export default async function Page() {
  return (
    <section className="section">
      <Container className="relative">
        <h1 className="text-center">Вхід</h1>

        <AuthForm typeAuth={AUTH_TYPES.LOGIN} />

        <p className="text-center text-ui_reg_20 mb-4">Ще не маєте акаунта?</p>

        <ChangeFormTypeButton
          type={AUTH_TYPES.LOGIN}
          className="mb-10 btn-outline mx-auto"
        />
      </Container>
    </section>
  );
}
