import { AuthForm } from '(shared)/components/forms/AuthForm';
import { ChangeFormTypeButton } from '(shared)/components/ui-kit/ChangeFormTypeButton';
import { Container } from '(shared)/components/ui-kit/Container';

import { AUTH_TYPES } from '(shared)/types/enums';

export default async function Page() {
  return (
    <section className="section">
      <Container className="relative">
        <h1 className="text-center">Реєстрація</h1>

        <AuthForm typeAuth={AUTH_TYPES.SIGN_UP} />

        <p className="text-center text-ui_reg_20 mb-4">Вже маєте акаунт?</p>

        <ChangeFormTypeButton
          type={AUTH_TYPES.SIGN_UP}
          className="mb-10 btn-outline mx-auto"
        />
      </Container>
    </section>
  );
}
