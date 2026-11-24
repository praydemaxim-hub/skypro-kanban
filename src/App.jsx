import { AppThemeProvider } from './contexts/ThemeContext';
import { GlobalStyle } from './Global.styled';
import AppRoutes from './AppRoutes';
import './App.css';

export default function App() {
  return (
    <AppThemeProvider>
      <GlobalStyle />
      <AppRoutes />
    </AppThemeProvider>
  );
}