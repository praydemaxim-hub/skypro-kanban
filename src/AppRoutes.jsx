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
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const handleAuth = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <Routes>
      <Route element={<PrivateRoute isAuth={!!user} />}>
        <Route path="/" element={<MainPage user={user} />}>
          <Route path="exit" element={<ExitPage handleAuth={handleAuth} />} />
          <Route path="card/:id" element={<CardPage />} />
          <Route path="card/new" element={<NewCardPage />} />
        </Route>
      </Route>

      <Route path="/login" element={<SignInPage handleAuth={handleAuth} />} />
      <Route path="/register" element={<SignUpPage handleAuth={handleAuth} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}