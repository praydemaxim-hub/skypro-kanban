import { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import Calendar from '../../components/Calendar/Calendar';
import { updateTask, deleteTask, getTaskById } from '../../services/api';

export default function CardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setCards } = useOutletContext();
  
  const [task, setTask] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getTaskById(user.token, id)
      .then((data) => {
        setTask(data);
        setEditedTask(data);
      })
      .catch((err) => setError(err.message));
  }, [id, user.token]);

  const handleDelete = async () => {
    try {
      const updatedTasks = await deleteTask(user.token, id);
      setCards(updatedTasks);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSave = async () => {
    try {
      const updatedTasks = await updateTask(user.token, id, editedTask);
      setCards(updatedTasks);
      setIsEditMode(false);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  if (!task) return <div style={{display: 'block'}} className="pop-browse">Загрузка...</div>;

  return (
    <div className="pop-browse" id="popBrowse" style={{ display: 'block' }}>
      <div className="pop-browse__container" onClick={() => navigate('/')}>
        <div className="pop-browse__block" onClick={(e) => e.stopPropagation()}>
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">Заголовок задачи</h3>
              <div className="categories__theme theme-top _orange _active-category">
                <p className="_orange">{task.topic}</p>
              </div>
            </div>

            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              <div className="status__themes">
                {['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'].map((status) => (
                  <div 
                    key={status}
                    className={`status__theme ${editedTask?.status === status ? '_gray' : ''}`}
                    onClick={() => isEditMode && setEditedTask({ ...editedTask, status })}
                    style={{ 
                      cursor: isEditMode ? 'pointer' : 'default',
                      backgroundColor: editedTask?.status === status ? '#94A6BE' : 'transparent',
                      color: editedTask?.status === status ? '#FFF' : '#94A6BE',
                      border: editedTask?.status === status ? 'none' : '1px solid #94A6BE',
                      borderRadius: '24px',
                      padding: '8px 20px',
                      marginRight: '10px'
                    }}
                  >
                    <p>{status}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pop-browse__wrap">
              <form className="pop-browse__form form-browse" id="formBrowseCard" action="#">
                <div className="form-browse__block">
                  <label htmlFor="textArea01" className="subttl">Описание задачи</label>
                  <textarea
                    className="form-browse__area"
                    name="description"
                    id="textArea01"
                    readOnly={!isEditMode}
                    value={isEditMode ? editedTask?.description : task.description}
                    onChange={handleInputChange}
                    placeholder="Введите описание задачи..."
                  ></textarea>
                </div>
              </form>
              
              <Calendar 
                selected={isEditMode ? new Date(editedTask.date) : new Date(task.date)} 
                setSelected={(date) => isEditMode && setEditedTask({ ...editedTask, date })} 
              />
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {!isEditMode ? (
              <div className="pop-browse__btn-browse">
                <div className="btn-group">
                  <button className="btn-browse__edit _btn-bor _hover03" onClick={() => setIsEditMode(true)}>
                    Редактировать задачу
                  </button>
                  <button className="btn-browse__delete _btn-bor _hover03" onClick={handleDelete}>
                    Удалить задачу
                  </button>
                </div>
                <button className="btn-browse__close _btn-bg _hover01" onClick={() => navigate('/')}>
                  <span style={{ color: 'white' }}>Закрыть</span>
                </button>
              </div>
            ) : (
              <div className="pop-browse__btn-edit">
                <div className="btn-group">
                  <button className="btn-edit__edit _btn-bg _hover01" onClick={handleSave}>
                    <span style={{ color: 'white' }}>Сохранить</span>
                  </button>
                  <button className="btn-edit__edit _btn-bor _hover03" onClick={() => {
                    setIsEditMode(false);
                    setEditedTask(task);
                  }}>
                    Отменить
                  </button>
                  <button className="btn-edit__delete _btn-bor _hover03" onClick={handleDelete}>
                    Удалить задачу
                  </button>
                </div>
                <button className="btn-edit__close _btn-bg _hover01" onClick={() => navigate('/')}>
                  <span style={{ color: 'white' }}>Закрыть</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}