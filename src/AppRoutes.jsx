import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import MainPage from "./pages/MainPage/MainPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ExitPage from "./pages/ExitPage/ExitPage";
import CardPage from "./pages/CardPage/CardPage";
import NewCardPage from "./pages/NewCardPage/NewCardPage";

export default function AppRoutes() {
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem('isAuth') === 'true';
  });

  const handleAuth = (value) => {
    setIsAuth(value);
    localStorage.setItem('isAuth', value.toString());
  };

  return (
    <Routes>
      <Route element={<PrivateRoute isAuth={isAuth} />}>
        <Route path="/" element={<MainPage />}>
          {/* Передаем handleAuth во вложенную модалку выхода */}
          <Route path="exit" element={<ExitPage handleAuth={handleAuth} />} />
          <Route path="card/:id" element={<CardPage />} />
          <Route path="card/new" element={<NewCardPage />} />
        </Route>
      </Route>

      {/* Передаем handleAuth на страницы входа и регистрации */}
      <Route path="/login" element={<SignInPage handleAuth={handleAuth} />} />
      <Route path="/register" element={<SignUpPage handleAuth={handleAuth} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}