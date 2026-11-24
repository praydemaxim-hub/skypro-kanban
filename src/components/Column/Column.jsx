import { useState } from 'react';
import Card from '../Card/Card';
import * as S from './Column.styled';

export default function Column({
  title,
  cards,
  isDraggingAny,
  onDragStartCard,
  onDragEndCard,
  onDropCard,
}) {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isOver) setIsOver(true);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const cardId = e.dataTransfer.getData('text/plain');
    if (cardId && onDropCard) {
      onDropCard(cardId, title);
    }
  };

  return (
    <S.MainColumn
      data-status={title}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <S.ColumnTitle>
        <p>{title}</p>
      </S.ColumnTitle>
      <S.CardsContainer>
        {cards.map((card) => (
          <Card
            key={card._id || card.id}
            id={card._id || card.id}
            topic={card.topic}
            title={card.title}
            date={card.date}
            onDragStartCard={onDragStartCard}
            onDragEndCard={onDragEndCard}
            onDropCard={onDropCard}
          />
        ))}
        {isDraggingAny && <S.DropZone $isOver={isOver} />}
      </S.CardsContainer>
    </S.MainColumn>
  );
}