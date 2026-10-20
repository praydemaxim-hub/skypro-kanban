import * as S from './PopUser.styled'

function PopUser({ isOpen }) {
  return (
    <S.PopUserSet id="user-set-target" $isOpen={isOpen}>
      <S.PopUserName>Ivan Ivanov</S.PopUserName>
      <S.PopUserMail>ivan.ivanov@gmail.com</S.PopUserMail>
      <S.PopUserTheme>
        <p>Темная тема</p>
        <input type="checkbox" name="checkbox" />
      </S.PopUserTheme>
      <S.PopUserButton type="button">
        <a href="#popExit">Выйти</a>
      </S.PopUserButton>
    </S.PopUserSet>
  )
}

export default PopUser