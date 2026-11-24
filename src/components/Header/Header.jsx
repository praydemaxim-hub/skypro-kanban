import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import PopUser from '../popups/PopUser/PopUser';
import { Container } from '../../Common.styled';
import * as S from './Header.styled';

export default function Header() {
  const [openedPath, setOpenedPath] = useState(null);
  const { user } = useAuth();
  const theme = useTheme();
  const location = useLocation();
  const userMenuRef = useRef(null);

  const isOpen = openedPath === location.pathname;
  const isModalOpen = location.pathname.startsWith('/card');

  const handleToggleUser = (e) => {
    e.preventDefault();
    setOpenedPath((prev) =>
      prev === location.pathname ? null : location.pathname
    );
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setOpenedPath(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <S.HeaderStyled>
      <Container>
        <S.HeaderBlock>
          <S.HeaderLogo>
            <Link to="/">
              <img
                src={theme.isDark ? '/images/logo_dark.png' : '/images/logo.png'}
                alt="logo"
              />
            </Link>
          </S.HeaderLogo>

          <S.HeaderNav>
            <S.HeaderBtnMainNew id="btnMainNew" $isHiddenMobile={isModalOpen}>
              <Link to="/card/new">Создать новую задачу</Link>
            </S.HeaderBtnMainNew>

            <div ref={userMenuRef}>
              <S.HeaderUser href="#user-set-target" onClick={handleToggleUser}>
                {user?.name || 'Пользователь'}
              </S.HeaderUser>

              <PopUser isOpen={isOpen} />
            </div>
          </S.HeaderNav>
        </S.HeaderBlock>
      </Container>
    </S.HeaderStyled>
  );
}