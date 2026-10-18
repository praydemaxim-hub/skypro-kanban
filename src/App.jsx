import { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { GlobalStyle } from './Global.styled'
import { Wrapper } from './Common.styled'

import Header from './components/Header/Header'
import Main from './components/Main/Main'
import PopUser from './components/popups/PopUser/PopUser'
import PopNewCard from './components/popups/PopNewCard/PopNewCard'
import PopBrowse from './components/popups/PopBrowse/PopBrowse'
import { cardList } from './data'

import './App.css' // Оставляем временно для pop-browse и pop-new-card

function App() {
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCards(cardList)
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <PopUser />
        <PopNewCard />
        <PopBrowse />
        <Header />
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h2 style={{ color: '#565eef' }}>Данные загружаются...</h2>
          </div>
        ) : (
          <Main cards={cards} />
        )}
      </Wrapper>
    </ThemeProvider>
  )
}

export default App