import styled from 'styled-components';

export const PopUserSet = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  height: 205px;
  border-radius: 10px;
  border: 0.7px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
  padding: 34px;
  text-align: center;
  z-index: 2;
`;

export const PopUserName = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 4px;
`;

export const PopUserMail = styled.p`
  color: ${({ theme }) => theme.colors.grayText};
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 10px;
`;

export const PopUserTheme = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  p {
    color: ${({ theme }) => theme.colors.black};
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
  }

  input[type="checkbox"] {
    position: relative;
    width: 24px;
    height: 13px;
    border-radius: 100px;
    background: ${({ theme }) => (theme.isDark ? '#FFFFFF' : '#EAEEF6')};
    outline: none;
    appearance: none;
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      top: 1px;
      left: 1px;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background-color: ${({ theme }) =>
        theme.isDark ? theme.colors.primary : theme.colors.grayText};
      transition: 0.3s;
    }

    &:checked::before {
      left: 12px;
    }
  }
`;

export const BaseButton = styled.button`
  border-radius: 4px;
  border: 1px solid
    ${({ theme }) => (theme.isDark ? '#FFFFFF' : theme.colors.primary)};
  background: transparent;
  color: ${({ theme }) => (theme.isDark ? '#FFFFFF' : theme.colors.primary)};
  transition: all 0.2s;

  a {
    color: ${({ theme }) => (theme.isDark ? '#FFFFFF' : theme.colors.primary)};
  }
`;

export const PopUserButton = styled(BaseButton)`
  width: 72px;
  height: 30px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    border-color: ${({ theme }) => theme.colors.primaryHover};
    color: #ffffff;

    a {
      color: #ffffff;
    }
  }
`;