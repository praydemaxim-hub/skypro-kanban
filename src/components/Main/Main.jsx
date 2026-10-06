import Column from '../Column/Column'

function Main() {
  const columns = [
    'Без статуса',
    'Нужно сделать',
    'В работе',
    'Тестирование',
    'Готово',
  ]

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {columns.map((title) => (
              <Column key={title} title={title} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Main