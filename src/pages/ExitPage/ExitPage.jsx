import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ExitPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
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
              
              <button className="pop-exit__exit-yes _hover01">
                <Link to="/login" onClick={handleLogout}>Да, выйти</Link>
              </button>
              
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