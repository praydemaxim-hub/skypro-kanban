import { useNavigate, Link } from 'react-router-dom';

export default function ExitPage({ handleAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    handleAuth(null);
  };

  return (
    <div className="pop-exit" id="popExit" style={{ display: 'block' }}>
      <div className="pop-exit__container" onClick={() => navigate('/')}>
        <div className="pop-exit__block" onClick={(e) => e.stopPropagation()}>
          <div className="pop-exit__ttl">
            <h2>Выйти из аккаунта?</h2>
          </div>
          <form className="pop-exit__form" id="popExitForm" action="#">
            <div className="pop-exit__form-group">
              
              {/* Кнопка "Да, выйти" */}
              <button className="pop-exit__exit-yes _hover01">
                <Link to="/login" onClick={handleLogout}>Да, выйти</Link>
              </button>
              
              {/* Кнопка "Нет, остаться" */}
              <button className="pop-exit__exit-no _hover03">
                <Link to="/">Нет, остаться</Link>
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}