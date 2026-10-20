import Card from '../Card/Card';
import * as S from './Column.styled';

export default function Column({ title, cards }) {
  return (
    <S.MainColumn>
      <S.ColumnTitle>
        <p>{title}</p>
      </S.ColumnTitle>
      <S.CardsContainer>
        {cards.map((card) => (
          <Card 
            key={card.id}
            id={card.id}
            topic={card.topic}
            title={card.title}
            date={card.date}
          />
        ))}
      </S.CardsContainer>
    </S.MainColumn>
  );
}