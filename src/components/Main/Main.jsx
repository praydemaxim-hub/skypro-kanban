import Column from '../Column/Column'
import { Container } from '../../Common.styled'
import * as S from './Main.styled'

function Main({ cards }) {
  const statusList = [
    'Без статуса',
    'Нужно сделать',
    'В работе',
    'Тестирование',
    'Готово',
  ]

  return (
    <S.MainStyled>
      <Container>
        <S.MainBlock>
          <S.MainContent>
            {statusList.map((status) => (
              <Column 
                key={status} 
                title={status} 
                cards={cards.filter((card) => card.status === status)} 
              />
            ))}
          </S.MainContent>
        </S.MainBlock>
      </Container>
    </S.MainStyled>
  )
}

export default Main