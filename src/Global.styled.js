import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *:before,
  *:after {
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.bgLight};
  }

  a,
  a:visited {
    text-decoration: none;
    cursor: pointer;
  }

  button,
  ._btn {
    cursor: pointer;
    outline: none;
  }

  ul li {
    list-style: none;
  }

  ${({ theme }) =>
    theme.isDark &&
    css`
      .wrapper {
        background-color: #151419;
      }

      ._orange {
        background-color: #ff6d00 !important;
        color: #ffe4c2 !important;
      }
      ._green {
        background-color: #06b16e !important;
        color: #b4fdd1 !important;
      }
      ._purple {
        background-color: #9a48f1 !important;
        color: #e9d4ff !important;
      }

      .pop-exit__block,
      .pop-new-card__block,
      .pop-browse__block {
        background-color: #20202c !important;
        border: 0.7px solid #4e5566 !important;
      }

      .pop-exit__ttl h2,
      .pop-new-card__ttl,
      .pop-browse__ttl,
      .subttl {
        color: #ffffff !important;
      }

      .pop-exit__exit-no,
      ._btn-bor {
        border: 1px solid #ffffff !important;
        color: #ffffff !important;
        background: transparent !important;

        a {
          color: #ffffff !important;
        }

        &:hover {
          background-color: #565eef !important;
          border-color: #565eef !important;
          color: #ffffff !important;
        }
      }

      .form-new__input,
      .form-new__area,
      .form-browse__area {
        background-color: transparent !important;
        color: #ffffff !important;
        border: 0.7px solid rgba(148, 166, 190, 0.4) !important;
      }

      .form-browse__area[readonly] {
        background-color: #151419 !important;
      }

      .calendar__p span {
        color: #ffffff !important;
      }
    `}
`;