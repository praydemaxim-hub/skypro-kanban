import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import { cardList } from '../../data';

export default function MainPage() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCards(cardList);
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <h2 style={{ color: '#565eef' }}>Данные загружаются...</h2>
        </div>
      ) : (
        <Main cards={cards} />
      )}
      <Outlet />
    </>
  );
}