import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../services/auth";
import * as S from "./SignInPage.styled";

export default function SignInPage({ handleAuth }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.login.trim() || !formData.password.trim()) {
      setError("Заполните все поля");
      return;
    }

    try {
      setIsLoading(true);
      const userData = await loginUser(formData);
      handleAuth(userData);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Modal>
      <S.ModalBlock>
        <S.ModalTitle><h2>Вход</h2></S.ModalTitle>
        <S.ModalForm onSubmit={handleLogin}>
          <S.ModalInput
            type="text"
            name="login"
            placeholder="Эл. почта"
            value={formData.login}
            onChange={handleChange}
          />
          <S.ModalInput
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
          />
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
          <S.ModalBtnEnter type="submit" disabled={isLoading}>
            {isLoading ? "Загрузка..." : "Войти"}
          </S.ModalBtnEnter>
          <S.ModalFormGroup>
            <p>Нужно зарегистрироваться?</p>
            <Link to="/register">Регистрируйтесь здесь</Link>
          </S.ModalFormGroup>
        </S.ModalForm>
      </S.ModalBlock>
    </S.Modal>
  );
}