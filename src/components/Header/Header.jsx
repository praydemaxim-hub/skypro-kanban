import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PopUser from '../popups/PopUser/PopUser';
import { Container } from '../../Common.styled';
import * as S from './Header.styled';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function Header() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [isPopUserOpen, setIsPopUserOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsPopUserOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const togglePopUser = (e) => {
    e.preventDefault();
    setIsPopUserOpen((prev) => !prev);
  };

  return (
    <S.HeaderStyled>
      <Container>
        <S.HeaderBlock>
          <S.HeaderLogo>
            <Link to="/">
              <img
                src={isDark ? '/images/logo_dark.png' : '/images/logo.png'}
                alt="logo"
              />
            </Link>
          </S.HeaderLogo>

          <S.HeaderNav ref={dropdownRef}>
            <S.HeaderBtnMainNew onClick={() => setIsPopUserOpen(false)}>
              <Link to="/card/new">Создать новую задачу</Link>
            </S.HeaderBtnMainNew>

            <S.HeaderUser href="#" onClick={togglePopUser}>
              {user?.name || 'Гость'}
            </S.HeaderUser>

            <PopUser isOpen={isPopUserOpen} />
          </S.HeaderNav>
        </S.HeaderBlock>
      </Container>
    </S.HeaderStyled>
  );
}