import TodoList from './components/TodoList'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          My TODO List
        </h1>
        <TodoList />
      </div>
    </div>
  )
}

export default App
