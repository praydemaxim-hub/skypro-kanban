import Column from '../Column/Column';
import CardSkeleton from '../Card/CardSkeleton';
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
                />
              ))}
            </S.MainContent>
          )}
        </S.MainBlock>
      </Container>
    </S.MainStyled>
  );
}