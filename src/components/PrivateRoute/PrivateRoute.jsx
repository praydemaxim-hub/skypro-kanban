import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ isAuth }) {
  // Если авторизован - рендерим вложенные маршруты, иначе редирект на логин
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}