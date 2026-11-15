import { Link } from 'react-router-dom';
import * as S from './PopUser.styled';

export default function PopUser({ isOpen, user }) {
  return (
    <S.PopUserSet id="user-set-target" $isOpen={isOpen}>
      <S.PopUserName>{user?.name || "Гость"}</S.PopUserName>
      <S.PopUserMail>{user?.login || "Нет почты"}</S.PopUserMail>
      <S.PopUserTheme>
        <p>Темная тема</p>
        <input type="checkbox" name="checkbox" />
      </S.PopUserTheme>
      <S.PopUserButton type="button">
        <Link to="/exit">Выйти</Link>
      </S.PopUserButton>
    </S.PopUserSet>
  );
}