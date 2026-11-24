import styled from 'styled-components';

export const MainColumn = styled.div`
  width: 20%;
  margin: 0 auto;
  display: block;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: 100%;
  }
`;

export const ColumnTitle = styled.div`
  padding: 0 10px;
  margin: 15px 0;

  p {
    color: ${({ theme }) => theme.colors.grayText};
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
  }
`;

export const CardsContainer = styled.div`
  width: 100%;
  display: block;
  position: relative;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    display: flex;
    overflow-y: auto;
  }
`;

export const DropZone = styled.div`
  width: 220px;
  height: 130px;
  margin: 5px;
  border-radius: 10px;
  border: 1px dashed ${({ $isOver, theme }) => ($isOver ? theme.colors.primary : '#94A6BE')};
  background-color: ${({ $isOver }) =>
    $isOver ? 'rgba(86, 94, 239, 0.08)' : 'transparent'};
  transition: all 0.2s ease;
`;