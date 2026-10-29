import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import { getTasks } from "../../services/api";

export default function MainPage({ user }) {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.token) return;

    getTasks(user.token)
      .then((tasks) => {
        setCards(tasks);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);

  return (
    <>
      <Header />
      {error && (
        <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
          <h3>Не удалось загрузить задачи</h3>
          <p>{error}</p>
        </div>
      )}
      {!error && isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <h2 style={{ color: "#565eef" }}>Данные загружаются...</h2>
        </div>
      ) : (
        !error && <Main cards={cards} />
      )}
      <Outlet />
    </>
  );
}