import { useNavigate } from 'react-router-dom';

export default function ExitPage({ handleAuth }) {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    handleAuth(false);
    navigate('/login');
  };

  return (
    <div className="pop-exit" id="popExit" style={{ display: 'block' }}>
      <div className="pop-exit__container">
        <div className="pop-exit__block">
          <div className="pop-exit__ttl">
            <h2>Выйти из аккаунта?</h2>
          </div>
          <form className="pop-exit__form" id="popExitForm" action="#">
            <div className="pop-exit__form-group">
              <button 
                className="pop-exit__exit-yes _hover01" 
                onClick={handleLogout}
                style={{ color: 'white' }}
              >
                Да, выйти
              </button>
              
              <button 
                className="pop-exit__exit-no _hover01" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  navigate('/'); 
                }}
                style={{ 
                  backgroundColor: '#565eef',
                  color: 'white',
                  border: 'none',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                Нет, остаться
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}