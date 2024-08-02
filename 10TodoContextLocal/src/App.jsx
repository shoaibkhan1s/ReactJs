import { useEffect, useState } from 'react' // React se hooks import kar rahe hain
import './App.css' // CSS file import kar rahe hain
import { TodoProvider } from './context/TodoContext' // TodoProvider context se import kar rahe hain
import TodoForm from './components/TodoForm' // TodoForm component import kar rahe hain
import TodoItem from './components/TodoItem' // TodoItem component import kar rahe hain

function App() {
  const [todos, setTodos] = useState([]) // todos ke liye initial state set kar rahe hain, empty array se

  // naya todo add karne ka function
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  // existing todo update karne ka function
  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) => prev.map((todo) =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    ))
  }

  // todo delete karne ka function
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  // todo ka complete status toggle karne ka function
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // useEffect jo initial load pe local storage se todos fetch karta hai
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  // useEffect jo todos ko local storage me save karta hai jab bhi todos state change hoti hai
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  // component ka return part, UI render karta hai
  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] h-screen py-8"> {/* background aur height set kar rahe hain */}
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1> {/* Heading */}
          <div className="mb-4">
            <TodoForm /> {/* TodoForm component */}
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => ( // todos ko map kar ke TodoItem render kar rahe hain
              <div className='w-full' key={todo.id}>
                <TodoItem todo={todo} /> {/* TodoItem component */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
