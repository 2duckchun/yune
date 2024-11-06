import { DndProvider } from 'react-dnd'
import { Main } from './pages/main'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Main />
    </DndProvider>
  )
}

export default App
