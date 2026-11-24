import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import * as S from './Card.styled';

export default function Card({
  id,
  topic,
  title,
  date,
  onDragStartCard,
  onDragEndCard,
  onDropCard,
}) {
  const theme = useTheme();
  const cardRef = useRef(null);
  const touchTimer = useRef(null);
  const touchStartPos = useRef({ x: 0, y: 0 });
  const currentTouchY = useRef(0);

  const [isDragging, setIsDragging] = useState(false);
  const [isTouchDrag, setIsTouchDrag] = useState(false);
  const [dragRect, setDragRect] = useState({ left: 0, top: 0, width: 220 });
  const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 });

  const topicColor = theme.topicColors[topic] || theme.topicColors['default'];

  const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
    if (onDragStartCard) onDragStartCard(id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (onDragEndCard) onDragEndCard();
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    currentTouchY.current = touch.clientY;

    touchTimer.current = setTimeout(() => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setDragRect({ left: rect.left, top: rect.top, width: rect.width });
      }
      setIsTouchDrag(true);
      setIsDragging(true);
      if (onDragStartCard) onDragStartCard(id);
    }, 300);
  };

  const handleTouchMoveBeforeDrag = (e) => {
    if (isTouchDrag) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartPos.current.x;
    const dy = touch.clientY - touchStartPos.current.y;

    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
      clearTimeout(touchTimer.current);
    }
  };

  const handleTouchEndBeforeDrag = () => {
    clearTimeout(touchTimer.current);
  };

  useEffect(() => {
    if (!isTouchDrag) return;

    let animationFrameId;
    const SCROLL_ZONE = 110;
    const SCROLL_SPEED = 7;

    const autoScroll = () => {
      const y = currentTouchY.current;
      const viewportHeight = window.innerHeight;

      if (y < SCROLL_ZONE) {
        window.scrollBy(0, -SCROLL_SPEED);
      } else if (y > viewportHeight - SCROLL_ZONE) {
        window.scrollBy(0, SCROLL_SPEED);
      }

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    const handleWindowTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      currentTouchY.current = touch.clientY;
      setTouchOffset({
        x: touch.clientX - touchStartPos.current.x,
        y: touch.clientY - touchStartPos.current.y,
      });
    };

    const handleWindowTouchEnd = (e) => {
      cancelAnimationFrame(animationFrameId);
      const touch = e.changedTouches[0];
      setIsTouchDrag(false);
      setIsDragging(false);
      setTouchOffset({ x: 0, y: 0 });

      const elementUnderFinger = document.elementFromPoint(touch.clientX, touch.clientY);
      const targetColumn = elementUnderFinger?.closest('[data-status]');
      const newStatus = targetColumn?.getAttribute('data-status');

      if (newStatus && onDropCard) {
        onDropCard(id, newStatus);
      } else if (onDragEndCard) {
        onDragEndCard();
      }
    };

    window.addEventListener('touchmove', handleWindowTouchMove, { passive: false });
    window.addEventListener('touchend', handleWindowTouchEnd);
    window.addEventListener('touchcancel', handleWindowTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('touchmove', handleWindowTouchMove);
      window.removeEventListener('touchend', handleWindowTouchEnd);
      window.removeEventListener('touchcancel', handleWindowTouchEnd);
    };
  }, [isTouchDrag, id, onDropCard, onDragEndCard]);

  return (
    <S.CardItem
      ref={cardRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMoveBeforeDrag}
      onTouchEnd={handleTouchEndBeforeDrag}
      style={
        isTouchDrag
          ? {
              position: 'fixed',
              left: `${dragRect.left}px`,
              top: `${dragRect.top}px`,
              width: `${dragRect.width}px`,
              transform: `translate(${touchOffset.x}px, ${touchOffset.y}px) scale(1.03)`,
              zIndex: 9999,
              opacity: 0.92,
              pointerEvents: 'none',
              boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.3)',
            }
          : {
              opacity: isDragging ? 0.5 : 1,
              cursor: 'grab',
            }
      }
    >
      <S.CardWrapper>
        <S.CardGroup>
          <S.CardTheme $color={topicColor}>
            <p>{topic}</p>
          </S.CardTheme>
          <Link to={`/card/${id}`}>
            <S.CardBtn>
              <div></div><div></div><div></div>
            </S.CardBtn>
          </Link>
        </S.CardGroup>
        <S.CardContent>
          <Link to={`/card/${id}`}>
            <S.CardTitle>{title}</S.CardTitle>
          </Link>
          <S.CardDate>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
              <g clipPath="url(#clip0_1_415)">
                <path d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z" stroke="#94A6BE" strokeWidth="0.8" strokeLinejoin="round"/>
                <path d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z" stroke="#94A6BE" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_1_415">
                  <rect width="13" height="13" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p>{formattedDate}</p>
          </S.CardDate>
        </S.CardContent>
      </S.CardWrapper>
    </S.CardItem>
  );
}