import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bgLight};
  
  h1 { font-size: 6rem; color: ${({ theme }) => theme.colors.primary}; }
  p { font-size: 1.5rem; margin-bottom: 20px; }
  
  a {
    padding: 10px 20px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border-radius: 4px;
    &:hover { background-color: ${({ theme }) => theme.colors.primaryHover}; }
  }
`;