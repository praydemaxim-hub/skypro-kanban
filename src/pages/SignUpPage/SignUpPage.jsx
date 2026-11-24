import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import * as S from '../SignInPage/SignInPage.styled';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({ name: '', login: '', password: '' });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    login: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
    setFieldErrors({ name: false, login: false, password: false });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const isNameEmpty = !formData.name.trim();
    const isLoginEmpty = !formData.login.trim();
    const isPasswordEmpty = !formData.password.trim();

    if (isNameEmpty || isLoginEmpty || isPasswordEmpty) {
      setFieldErrors({
        name: isNameEmpty,
        login: isLoginEmpty,
        password: isPasswordEmpty,
      });
      setError(
        'Введенные вами данные не корректны. Чтобы завершить регистрацию, заполните все поля в форме.'
      );
      return;
    }

    try {
      setIsLoading(true);
      await register({
        name: formData.name.trim(),
        login: formData.login.trim(),
        password: formData.password.trim(),
      });
      toast.success('Регистрация прошла успешно!');
      navigate('/');
    } catch (err) {
      setFieldErrors({ name: true, login: true, password: true });
      setError(
        err.message ||
          'Введенные вами данные не корректны. Чтобы завершить регистрацию, введите данные корректно и повторите попытку.'
      );
      toast.error(err.message || 'Ошибка регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Modal>
      <S.ModalBlock>
        <S.ModalTitle>
          <h2>Регистрация</h2>
        </S.ModalTitle>
        <S.ModalForm onSubmit={handleRegister}>
          <S.ModalInput
            type="text"
            name="name"
            placeholder="Имя"
            value={formData.name}
            onChange={handleChange}
            $isError={fieldErrors.name}
          />
          <S.ModalInput
            type="text"
            name="login"
            placeholder="Эл. почта"
            value={formData.login}
            onChange={handleChange}
            $isError={fieldErrors.login}
          />
          <S.ModalInput
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            $isError={fieldErrors.password}
          />
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          <S.ModalBtnEnter type="submit" disabled={isLoading || Boolean(error)}>
            {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
          </S.ModalBtnEnter>
          <S.ModalFormGroup>
            <p>
              Уже есть аккаунт? <Link to="/login">Войдите здесь</Link>
            </p>
          </S.ModalFormGroup>
        </S.ModalForm>
      </S.ModalBlock>
    </S.Modal>
  );
}