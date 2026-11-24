import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Calendar from '../../components/Calendar/Calendar';
import { getTaskById } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useTasks } from '../../contexts/TaskContext';

const STATUS_LIST = [
  'Без статуса',
  'Нужно сделать',
  'В работе',
  'Тестирование',
  'Готово',
];

const TOPIC_CLASSES = {
  'Web Design': '_orange',
  Research: '_green',
  Copywriting: '_purple',
};

export default function CardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateTask, deleteTask } = useTasks();

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
      .catch((err) => {
        setError(err.message);
        toast.error(err.message || 'Не удалось загрузить задачу');
      });
  }, [id, user.token]);

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      toast.success('Задача удалена');
      navigate('/');
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Не удалось удалить задачу');
    }
  };

  const handleSave = async () => {
    if (!editedTask?.description?.trim()) {
      setError('Описание задачи не может быть пустым');
      return;
    }

    try {
      await updateTask(id, {
        ...editedTask,
        description: editedTask.description.trim(),
      });
      toast.success('Задача успешно обновлена');
      setIsEditMode(false);
      navigate('/');
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Не удалось сохранить изменения');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
    setError('');
  };

  if (!task) {
    return (
      <div style={{ display: 'block' }} className="pop-browse">
        Загрузка...
      </div>
    );
  }

  const topicClass = TOPIC_CLASSES[task.topic] || '_gray';
  const visibleStatuses = isEditMode ? STATUS_LIST : [task.status];

  return (
    <div className="pop-browse" id="popBrowse" style={{ display: 'block' }}>
      <div className="pop-browse__container" onClick={() => navigate('/')}>
        <div className="pop-browse__block" onClick={(e) => e.stopPropagation()}>
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">{task.title}</h3>
              <div className={`categories__theme theme-top ${topicClass} _active-category`}>
                <p className={topicClass}>{task.topic}</p>
              </div>
            </div>

            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              <div className="status__themes">
                {visibleStatuses.map((status) => {
                  const isActive = (isEditMode ? editedTask?.status : task.status) === status;
                  return (
                    <div
                      key={status}
                      className={`status__theme ${isActive ? '_gray' : ''}`}
                      onClick={() => isEditMode && setEditedTask({ ...editedTask, status })}
                      style={{
                        cursor: isEditMode ? 'pointer' : 'default',
                        backgroundColor: isActive ? '#94A6BE' : 'transparent',
                        color: isActive ? '#FFF' : '#94A6BE',
                        border: isActive ? 'none' : '1px solid #94A6BE',
                        borderRadius: '24px',
                        padding: '8px 20px',
                        marginRight: '10px',
                      }}
                    >
                      <p>{status}</p>
                    </div>
                  );
                })}
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

            <div className="theme-down__categories theme-down">
              <p className="categories__p subttl">Категория</p>
              <div className={`categories__theme ${topicClass} _active-category`}>
                <p className={topicClass}>{task.topic}</p>
              </div>
            </div>

            {error && <p style={{ color: '#F84D4D', marginBottom: '10px', fontSize: '14px' }}>{error}</p>}

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
                  <button className="btn-edit__save _btn-bg _hover01" onClick={handleSave}>
                    <span style={{ color: 'white' }}>Сохранить</span>
                  </button>
                  <button
                    className="btn-edit__cancel _btn-bor _hover03"
                    onClick={() => {
                      setIsEditMode(false);
                      setEditedTask(task);
                      setError('');
                    }}
                  >
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