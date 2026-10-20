import Card from '../Card/Card'
import * as S from './Column.styled'

function Column({ title, cards }) {
  return (
    <S.MainColumn>
      <S.ColumnTitle>
        <p>{title}</p>
      </S.ColumnTitle>
      <S.CardsContainer>
        {cards.map((card) => (
          <Card 
            key={card.id}
            topic={card.topic}
            title={card.title}
            date={card.date}
          />
        ))}
      </S.CardsContainer>
    </S.MainColumn>
  )
}

export default Column