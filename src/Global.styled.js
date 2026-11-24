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

  .theme-down {
    display: none;
  }

  .header__pop-user-set {
    display: block !important;
    z-index: 10;
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

  @media screen and (max-width: 660px) {
    .pop-new-card,
    .pop-browse {
      position: fixed !important;
      top: 70px;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: auto;
      z-index: 7;
      overflow-y: auto;
      background-color: ${({ theme }) => theme.colors.white};
    }

    .pop-new-card__container,
    .pop-browse__container {
      padding: 0;
      display: block !important;
      height: auto !important;
      min-height: 100%;
    }

    .pop-new-card__block,
    .pop-browse__block {
      width: 100%;
      max-width: 100%;
      height: auto !important;
      min-height: 100%;
      border-radius: 0;
      border: none !important;
      padding: 20px 16px 80px;
    }

    .pop-new-card__wrap,
    .pop-browse__wrap {
      display: flex;
      flex-direction: column;
    }

    .pop-new-card__form,
    .pop-browse__form {
      max-width: 100%;
      width: 100%;
    }

    .form-new__area,
    .form-browse__area {
      max-width: 100%;
      width: 100%;
      height: 34px;
    }

    .form-new__create {
      float: none !important;
      display: block;
      width: 100%;
      height: 40px;
      margin-top: 20px;
    }

    .pop-browse__btn-browse,
    .pop-browse__btn-edit {
      flex-direction: column;
      gap: 10px;
    }

    .pop-browse__btn-browse .btn-group,
    .pop-browse__btn-edit .btn-group {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-right: 0;
    }

    .pop-browse__btn-browse button,
    .pop-browse__btn-edit button {
      width: 100%;
      height: 40px;
      margin-right: 0;
    }

    .theme-top {
      display: none !important;
    }

    .theme-down {
      display: block !important;
      margin-bottom: 20px;
    }

    .pop-browse__btn-edit .btn-group {
      display: contents;
    }

    .btn-edit__save {
      order: 1;
    }

    .btn-edit__close {
      order: 2;
    }

    .btn-edit__cancel {
      order: 3;
    }

    .btn-edit__delete {
      order: 4;
    }
  }

  @media screen and (max-width: 495px) {
    .pop-exit__block {
      padding: 50px 20px;
      margin: 0 16px;
    }

    .pop-exit__form-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .pop-exit__exit-yes,
    .pop-exit__exit-no {
      width: 100%;
      height: 40px;
      margin-right: 0;
    }

    .Toastify__toast-container--bottom-right {
      bottom: 82px !important;
      left: 16px !important;
      right: 16px !important;
      width: auto !important;
      padding: 0 !important;
    }

    .Toastify__toast {
      min-height: 42px !important;
      padding: 8px 12px !important;
      margin-bottom: 8px !important;
      border-radius: 8px !important;
      font-size: 13px !important;
    }

    .Toastify__toast-body {
      padding: 0 !important;
      margin: 0 !important;
    }
  }
`;