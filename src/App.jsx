import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { GlobalStyle } from './Global.styled'
import { Wrapper } from './Common.styled'
import AppRoutes from './AppRoutes'
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <AppRoutes />
      </Wrapper>
    </ThemeProvider>
  )
}

export default App