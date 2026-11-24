import styled from 'styled-components';

export const MainStyled = styled.main`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bgLight};
`;

export const MainBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    padding: 40px 0 64px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 20px 0 90px;
  }
`;

export const MainContent = styled.div`
  width: 100%;
  display: flex;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    display: block;
  }
`;

export const EmptyMessage = styled.div`
  width: 100%;
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    color: ${({ theme }) => theme.colors.grayText};
    font-size: 20px;
    font-weight: 500;
  }
`;