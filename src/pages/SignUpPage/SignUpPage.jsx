import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../services/auth";
import * as S from "../SignInPage/SignInPage.styled";

export default function SignUpPage({ handleAuth }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", login: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.login.trim() || !formData.password.trim()) {
      setError("Заполните все поля");
      return;
    }

    try {
      setIsLoading(true);
      const userData = await registerUser(formData);
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
        <S.ModalTitle><h2>Регистрация</h2></S.ModalTitle>
        <S.ModalForm onSubmit={handleRegister}>
          <S.ModalInput
            type="text"
            name="name"
            placeholder="Имя"
            value={formData.name}
            onChange={handleChange}
          />
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
            {isLoading ? "Загрузка..." : "Зарегистрироваться"}
          </S.ModalBtnEnter>
          <S.ModalFormGroup>
            <p>Уже есть аккаунт? <Link to="/login">Войдите здесь</Link></p>
          </S.ModalFormGroup>
        </S.ModalForm>
      </S.ModalBlock>
    </S.Modal>
  );
}