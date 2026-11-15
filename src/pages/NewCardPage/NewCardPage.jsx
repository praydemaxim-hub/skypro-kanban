import { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import Calendar from '../../components/Calendar/Calendar';
import { addTask } from '../../services/api';

export default function NewCardPage() {
  const navigate = useNavigate();
  const { user, setCards } = useOutletContext(); 

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    topic: 'Web Design',
    date: new Date(),
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.description.trim()) {
      setError('Заполните все поля');
      return;
    }
    try {
      const updatedTasks = await addTask(user.token, newTask);
      setCards(updatedTasks); 
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="pop-new-card" id="popNewCard" style={{ display: 'block' }}>
      <div className="pop-new-card__container" onClick={() => navigate('/')}>
        <div className="pop-new-card__block" onClick={(e) => e.stopPropagation()}>
          <div className="pop-new-card__content">
            <h3 className="pop-new-card__ttl">Создание задачи</h3>
            <Link to="/" className="pop-new-card__close">✖</Link>
            
            <div className="pop-new-card__wrap">
              <form className="pop-new-card__form form-new" id="formNewCard" onSubmit={handleCreateTask}>
                <div className="form-new__block">
                  <label htmlFor="formTitle" className="subttl">Название задачи</label>
                  <input
                    className="form-new__input"
                    type="text"
                    name="title"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    value={newTask.title}
                    onChange={handleInputChange}
                    autoFocus
                  />
                </div>
                <div className="form-new__block">
                  <label htmlFor="textArea" className="subttl">Описание задачи</label>
                  <textarea
                    className="form-new__area"
                    name="description"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                    value={newTask.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </form>
              
              <Calendar 
                selected={newTask.date} 
                setSelected={(date) => setNewTask({ ...newTask, date })} 
              />
            </div>

            <div className="pop-new-card__categories categories">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__themes">
                <div 
                  className={`categories__theme _orange ${newTask.topic === 'Web Design' ? '_active-category' : ''}`}
                  onClick={() => setNewTask({ ...newTask, topic: 'Web Design' })}
                  style={{ cursor: "pointer" }}
                >
                  <p className="_orange">Web Design</p>
                </div>
                <div 
                  className={`categories__theme _green ${newTask.topic === 'Research' ? '_active-category' : ''}`}
                  onClick={() => setNewTask({ ...newTask, topic: 'Research' })}
                  style={{ cursor: "pointer" }}
                >
                  <p className="_green">Research</p>
                </div>
                <div 
                  className={`categories__theme _purple ${newTask.topic === 'Copywriting' ? '_active-category' : ''}`}
                  onClick={() => setNewTask({ ...newTask, topic: 'Copywriting' })}
                  style={{ cursor: "pointer" }}
                >
                  <p className="_purple">Copywriting</p>
                </div>
              </div>
            </div>

            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            
            <button className="form-new__create _hover01" id="btnCreate" onClick={handleCreateTask}>
              Создать задачу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}