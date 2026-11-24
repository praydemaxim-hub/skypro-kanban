import styled from 'styled-components';

export const Modal = styled.div`
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.bgLight};
`;

export const ModalBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 368px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid ${({ theme }) => (theme.isDark ? '#4E5566' : '#D4DBE5')};
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
`;

export const ModalTitle = styled.div`
  h2 {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: -0.6px;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const ModalForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ModalInput = styled.input`
  width: 100%;
  border-radius: 8px;
  border: 0.7px solid
    ${({ $isError }) => ($isError ? '#F84D4D' : 'rgba(148, 166, 190, 0.4)')};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.black};
  outline: none;
  padding: 10px 8px;
  margin-bottom: 7px;
  transition: border-color 0.2s;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.grayText};
  }
`;

export const ErrorMessage = styled.p`
  color: #f84d4d;
  font-size: 12px;
  line-height: 150%;
  text-align: center;
  margin-top: 7px;
`;

export const ModalBtnEnter = styled.button`
  width: 100%;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  outline: none;
  color: #ffffff;
  font-weight: 500;
  transition: 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    background-color: #94a6be;
    cursor: not-allowed;
  }
`;

export const ModalFormGroup = styled.div`
  text-align: center;

  p,
  a {
    color: rgba(148, 166, 190, 0.4);
    font-size: 14px;
    font-weight: 400;
  }

  a {
    text-decoration: underline;
  }
`;