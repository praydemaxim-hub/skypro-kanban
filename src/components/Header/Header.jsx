import { useState } from 'react'
import PopUser from '../popups/PopUser/PopUser'
import { Container } from '../../Common.styled'
import * as S from './Header.styled'

function Header() {
  const [isPopUserOpen, setIsPopUserOpen] = useState(false)

  const togglePopUser = (e) => {
    e.preventDefault()
    setIsPopUserOpen(!isPopUserOpen)
  }

  return (
    <S.HeaderStyled>
      <Container>
        <S.HeaderBlock>
          <S.HeaderLogo>
            <a href="" target="_self">
              <img src="/images/logo.png" alt="logo" />
            </a>
          </S.HeaderLogo>
          
          <S.HeaderNav>
            <S.HeaderBtnMainNew>
              <a href="#popNewCard">Создать новую задачу</a>
            </S.HeaderBtnMainNew>
            <S.HeaderUser href="#user-set-target" onClick={togglePopUser}>
              Ivan Ivanov
            </S.HeaderUser>
            <PopUser isOpen={isPopUserOpen} />
          </S.HeaderNav>
        </S.HeaderBlock>
      </Container>
    </S.HeaderStyled>
  )
}

export default Header