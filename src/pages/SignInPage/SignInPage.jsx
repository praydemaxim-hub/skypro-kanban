import { Link, useNavigate } from 'react-router-dom';
import * as S from './SignInPage.styled';

export default function SignInPage({ handleAuth }) {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Проверяем, зарегистрирован ли пользователь
    const isRegistered = localStorage.getItem('isRegistered');
    
    if (isRegistered === 'true') {
      handleAuth(true); 
      navigate('/');
    } else {
      alert('Пользователь не найден! Пожалуйста, сначала зарегистрируйтесь.');
    }
  };

  return (
    <S.Modal>
      <S.ModalBlock>
        <S.ModalTitle><h2>Вход</h2></S.ModalTitle>
        <S.ModalForm action="#">
          <S.ModalInput type="text" placeholder="Эл. почта" />
          <S.ModalInput type="password" placeholder="Пароль" />
          <S.ModalBtnEnter onClick={handleLogin}>Войти</S.ModalBtnEnter>
          <S.ModalFormGroup>
            <p>Нужно зарегистрироваться?</p>
            <Link to="/register">Регистрируйтесь здесь</Link>
          </S.ModalFormGroup>
        </S.ModalForm>
      </S.ModalBlock>
    </S.Modal>
  );
}