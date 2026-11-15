import { useState, useEffect, useRef } from 'react';
import * as S from './Calendar.styled';

export default function Calendar({ selected, setSelected }) {
  const [currentDate, setCurrentDate] = useState(selected ? new Date(selected) : new Date());
  
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  
  const [yearScrollStart, setYearScrollStart] = useState(new Date().getFullYear());

  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  
  const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (monthRef.current && !monthRef.current.contains(e.target)) setIsMonthPickerOpen(false);
      if (yearRef.current && !yearRef.current.contains(e.target)) setIsYearPickerOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDayClick = (day) => {
    if (!day) return;
    const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (setSelected) setSelected(newSelectedDate);
  };

  const getDaysGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let startDay = new Date(year, month, 1).getDay();
    startDay = startDay === 0 ? 6 : startDay - 1;

    const blanks = Array.from({ length: startDay }, () => null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    return [...blanks, ...days];
  };

  const today = new Date();
  const daysGrid = getDaysGrid();

  const formatFooterDate = (dateObj) => {
    if (!dateObj) return '';
    const d = String(dateObj.getDate()).padStart(2, '0');
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const y = String(dateObj.getFullYear()).slice(-2);
    return `${d}.${m}.${y}.`;
  };

  const visibleYears = Array.from({ length: 5 }, (_, i) => yearScrollStart + i);

  return (
    <S.CalendarWrapper>
      <S.MainTitle>Даты</S.MainTitle>
      <S.Header>
        <S.HeaderTitle>
          <S.MonthSelector ref={monthRef}>
            <span onClick={() => { setIsMonthPickerOpen(!isMonthPickerOpen); setIsYearPickerOpen(false); }}>
              {months[currentDate.getMonth()]}
            </span>
            {isMonthPickerOpen && (
              <S.DropdownGrid>
                {months.map((m, idx) => (
                  <S.DropdownItem key={m} onClick={() => {
                    setCurrentDate(new Date(currentDate.getFullYear(), idx, 1));
                    setIsMonthPickerOpen(false);
                  }}>
                    {m}
                  </S.DropdownItem>
                ))}
              </S.DropdownGrid>
            )}
          </S.MonthSelector>
          {' '}
          <S.YearSelector ref={yearRef}>
            <span onClick={() => { setIsYearPickerOpen(!isYearPickerOpen); setIsMonthPickerOpen(false); }}>
              {currentDate.getFullYear()}
            </span>
            {isYearPickerOpen && (
              <S.DropdownList>
                <S.ArrowBtn onClick={() => setYearScrollStart(prev => Math.max(2000, prev - 1))}>▲</S.ArrowBtn>
                {visibleYears.map((y) => (
                  <S.DropdownItem key={y} onClick={() => {
                    setCurrentDate(new Date(y, currentDate.getMonth(), 1));
                    setIsYearPickerOpen(false);
                  }}>
                    {y}
                  </S.DropdownItem>
                ))}
                <S.ArrowBtn onClick={() => setYearScrollStart(prev => Math.min(2200 - 4, prev + 1))}>▼</S.ArrowBtn>
              </S.DropdownList>
            )}
          </S.YearSelector>
        </S.HeaderTitle>
        <S.NavArrows>
          <S.Arrow onClick={handlePrevMonth}>{'<'}</S.Arrow>
          <S.Arrow onClick={handleNextMonth}>{'>'}</S.Arrow>
        </S.NavArrows>
      </S.Header>

      <S.DaysOfWeek>
        {daysOfWeek.map(day => <S.DayName key={day}>{day}</S.DayName>)}
      </S.DaysOfWeek>

      <S.DaysGrid>
        {daysGrid.map((day, index) => {
          const isToday = day === today.getDate() && 
                          currentDate.getMonth() === today.getMonth() && 
                          currentDate.getFullYear() === today.getFullYear();
                          
          const isSelected = selected && day === selected.getDate() && 
                             currentDate.getMonth() === selected.getMonth() && 
                             currentDate.getFullYear() === selected.getFullYear();

          return (
            <S.DayCellWrapper key={index}>
              <S.DayCell 
                $isEmpty={!day} 
                $isToday={isToday} 
                $isSelected={isSelected}
                onClick={() => handleDayClick(day)}
              >
                {day || ''}
              </S.DayCell>
            </S.DayCellWrapper>
          );
        })}
      </S.DaysGrid>

      <S.FooterText>
        {selected ? (
          <>Срок исполнения: <span style={{ color: '#000' }}>{formatFooterDate(selected)}</span></>
        ) : (
          'Выберите срок исполнения.'
        )}
      </S.FooterText>
    </S.CalendarWrapper>
  );
}