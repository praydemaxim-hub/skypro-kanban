import { useState } from 'react';
import { Link } from 'react-router-dom';
import PopUser from '../popups/PopUser/PopUser';
import { Container } from '../../Common.styled';
import * as S from './Header.styled';

export default function Header() {
  const [isPopUserOpen, setIsPopUserOpen] = useState(false);

  const togglePopUser = (e) => {
    e.preventDefault();
    setIsPopUserOpen(!isPopUserOpen);
  };

  return (
    <S.HeaderStyled>
      <Container>
        <S.HeaderBlock>
          <S.HeaderLogo>
            <Link to="/">
              <img src="/images/logo.png" alt="logo" />
            </Link>
          </S.HeaderLogo>
          
          <S.HeaderNav>
            <S.HeaderBtnMainNew>
              <Link to="/card/new">Создать новую задачу</Link>
            </S.HeaderBtnMainNew>
            <S.HeaderUser href="#" onClick={togglePopUser}>
              Ivan Ivanov
            </S.HeaderUser>
            <PopUser isOpen={isPopUserOpen} />
          </S.HeaderNav>
        </S.HeaderBlock>
      </Container>
    </S.HeaderStyled>
  );
}