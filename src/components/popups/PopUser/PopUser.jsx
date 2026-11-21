import { Link } from 'react-router-dom';
import * as S from './PopUser.styled';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';

export default function PopUser({ isOpen }) {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <S.PopUserSet id="user-set-target" $isOpen={isOpen}>
      <S.PopUserName>{user?.name || 'Гость'}</S.PopUserName>
      <S.PopUserMail>{user?.login || 'Нет почты'}</S.PopUserMail>
      <S.PopUserTheme>
        <p>Темная тема</p>
        <input
          type="checkbox"
          name="checkbox"
          checked={isDark}
          onChange={toggleTheme}
        />
      </S.PopUserTheme>
      <S.PopUserButton type="button">
        <Link to="/exit">Выйти</Link>
      </S.PopUserButton>
    </S.PopUserSet>
  );
}