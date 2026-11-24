import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import * as S from './SignInPage.styled';

export default function SignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ login: '', password: '' });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ login: false, password: false });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
    setFieldErrors({ login: false, password: false });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const isLoginEmpty = !formData.login.trim();
    const isPasswordEmpty = !formData.password.trim();

    if (isLoginEmpty || isPasswordEmpty) {
      setFieldErrors({ login: isLoginEmpty, password: isPasswordEmpty });
      setError(
        'Введенные вами данные не распознаны. Проверьте свой логин и пароль и повторите попытку входа.'
      );
      return;
    }

    try {
      setIsLoading(true);
      const userData = await login({
        login: formData.login.trim(),
        password: formData.password.trim(),
      });
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      const userName = userData?.name || storedUser?.name || formData.login;

      toast.success(`Добро пожаловать, ${userName}!`);
      navigate('/');
    } catch (err) {
      setFieldErrors({ login: true, password: true });
      setError(
        err.message ||
          'Введенные вами данные не распознаны. Проверьте свой логин и пароль и повторите попытку входа.'
      );
      toast.error(err.message || 'Ошибка входа');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Modal>
      <S.ModalBlock>
        <S.ModalTitle>
          <h2>Вход</h2>
        </S.ModalTitle>
        <S.ModalForm onSubmit={handleLogin}>
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
            {isLoading ? 'Загрузка...' : 'Войти'}
          </S.ModalBtnEnter>
          <S.ModalFormGroup>
            <p>Нужно зарегистрироваться?</p>
            <Link to="/register">Регистрируйтесь здесь</Link>
          </S.ModalFormGroup>
        </S.ModalForm>
      </S.ModalBlock>
    </S.Modal>
  );
}