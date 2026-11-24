import { useState } from 'react';
import { toast } from 'react-toastify';
import Column from '../Column/Column';
import CardSkeleton from '../Card/CardSkeleton';
import { useTasks } from '../../contexts/TaskContext';
import { Container } from '../../Common.styled';
import * as S from './Main.styled';
import * as ColS from '../Column/Column.styled';

const statusList = [
  'Без статуса',
  'Нужно сделать',
  'В работе',
  'Тестирование',
  'Готово',
];

const skeletonCounts = [5, 1, 3, 1, 1];

export default function Main({ cards, isLoading }) {
  const { updateTask } = useTasks();
  const [draggedCardId, setDraggedCardId] = useState(null);

  const handleDropCard = async (cardId, newStatus) => {
    setDraggedCardId(null);

    const targetCard = cards.find((c) => (c._id || c.id) === cardId);
    if (!targetCard || targetCard.status === newStatus) return;

    try {
      await updateTask(cardId, { ...targetCard, status: newStatus });
      toast.success(
      <div>
        Статус задания изменён на:
        <br />
        <strong>«{newStatus}»</strong>
      </div>
    );
    } catch (err) {
      toast.error(err.message || 'Не удалось переместить задачу');
    }
  };

  return (
    <S.MainStyled>
      <Container>
        <S.MainBlock>
          {isLoading ? (
            <S.MainContent>
              {statusList.map((status, index) => (
                <ColS.MainColumn key={status}>
                  <ColS.ColumnTitle>
                    <p>{status}</p>
                  </ColS.ColumnTitle>
                  <ColS.CardsContainer>
                    {Array.from({ length: skeletonCounts[index] }).map((_, idx) => (
                      <CardSkeleton key={idx} />
                    ))}
                  </ColS.CardsContainer>
                </ColS.MainColumn>
              ))}
            </S.MainContent>
          ) : cards.length === 0 ? (
            <S.EmptyMessage>
              <p>Новых задач нет</p>
            </S.EmptyMessage>
          ) : (
            <S.MainContent>
              {statusList.map((status) => (
                <Column
                  key={status}
                  title={status}
                  cards={cards.filter((card) => card.status === status)}
                  isDraggingAny={Boolean(draggedCardId)}
                  onDragStartCard={setDraggedCardId}
                  onDragEndCard={() => setDraggedCardId(null)}
                  onDropCard={handleDropCard}
                />
              ))}
            </S.MainContent>
          )}
        </S.MainBlock>
      </Container>
    </S.MainStyled>
  );
}