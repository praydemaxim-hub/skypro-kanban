import { Link, useNavigate } from 'react-router-dom';
import * as S from '../SignInPage/SignInPage.styled';

export default function SignUpPage({ handleAuth }) {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    localStorage.setItem('isRegistered', 'true');
    
    handleAuth(true);
    navigate('/');
  };

  return (
    <S.Modal>
      <S.ModalBlock>
        <S.ModalTitle><h2>Регистрация</h2></S.ModalTitle>
        <S.ModalForm action="#">
          <S.ModalInput type="text" placeholder="Имя" />
          <S.ModalInput type="text" placeholder="Эл. почта" />
          <S.ModalInput type="password" placeholder="Пароль" />
          <S.ModalBtnEnter onClick={handleRegister}>Зарегистрироваться</S.ModalBtnEnter>
          <S.ModalFormGroup>
            <p>Уже есть аккаунт? <Link to="/login">Войдите здесь</Link></p>
          </S.ModalFormGroup>
        </S.ModalForm>
      </S.ModalBlock>
    </S.Modal>
  );
}