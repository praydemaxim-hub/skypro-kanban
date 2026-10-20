import { Link } from 'react-router-dom';
import * as S from './NotFoundPage.styled';

export default function NotFoundPage() {
  return (
    <S.ErrorContainer>
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link to="/">Вернуться на главную</Link>
    </S.ErrorContainer>
  );
}