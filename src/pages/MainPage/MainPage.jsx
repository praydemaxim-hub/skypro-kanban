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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Header />

      {error ? (
        <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
          <h3>Не удалось загрузить задачи</h3>
          <p>{error}</p>
        </div>
      ) : (
        <Main cards={tasks} isLoading={isLoading} />
      )}

      <Outlet />
    </>
  );
}