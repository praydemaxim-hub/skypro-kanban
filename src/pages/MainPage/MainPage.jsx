import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TaskContext";

export default function MainPage() {
  const { user } = useAuth();
  const { tasks, isLoading, error, loadTasks } = useTasks();

  useEffect(() => {
    loadTasks();
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
        !error && <Main cards={tasks} />
      )}
      
      <Outlet />
    </>
  );
}