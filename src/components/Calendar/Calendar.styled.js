import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 180px;
  font-family: 'Roboto', Arial, sans-serif;
  color: #94A6BE;
  user-select: none;
`;

export const MainTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  margin: 0 0 10px 0;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const HeaderTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  display: flex;
  gap: 4px;
`;

export const MonthSelector = styled.div`
  position: relative;
  cursor: pointer;
  color: #94A6BE;
  &:hover { color: #565EEF; }
`;

export const YearSelector = styled.div`
  position: relative;
  cursor: pointer;
  color: #94A6BE;
  &:hover { color: #565EEF; }
`;

export const NavArrows = styled.div`
  display: flex;
  gap: 8px;
`;

export const Arrow = styled.span`
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: #94A6BE;
  &:hover { color: #565EEF; }
`;

export const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 8px;
`;

export const DayName = styled.div`
  font-size: 10px;
  text-align: center;
  color: #94A6BE;
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px 0;
  margin-bottom: 10px;
`;

export const DayCellWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
`;

export const DayCell = styled.div`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: ${(props) => (props.$isEmpty ? 'default' : 'pointer')};
  font-weight: ${(props) => (props.$isToday ? '700' : '400')};
  color: ${(props) =>
    props.$isEmpty ? 'transparent' : props.$isSelected ? '#FFFFFF' : '#94A6BE'};
  background-color: ${(props) => (props.$isSelected ? '#94A6BE' : 'transparent')};
  border-radius: 50%;

  &:hover {
    background-color: ${(props) =>
      !props.$isEmpty && !props.$isSelected
        ? props.theme.isDark
          ? '#151419'
          : '#EAEEF6'
        : ''};
  }
`;

export const FooterText = styled.div`
  font-size: 10px;
  color: #94A6BE;

  span {
    color: ${({ theme }) => theme.colors.black} !important;
  }
`;

export const DropdownGrid = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  padding: 10px;
  z-index: 10;
  width: 180px;
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  z-index: 10;
  width: 80px;
`;

export const DropdownItem = styled.div`
  padding: 5px;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => (theme.isDark ? '#151419' : '#EAEEF6')};
    color: #565EEF;
  }
`;

export const ArrowBtn = styled.div`
  text-align: center;
  font-size: 10px;
  cursor: pointer;
  color: #94A6BE;
  padding: 3px 0;
  &:hover { color: #565EEF; }
`;