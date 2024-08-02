import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext'

function TodoForm() {
    const [todo, setTodo] = useState('') // todo ke liye state initialize kar rahe hain
    const { addTodo } = useTodo() // context se addTodo function le rahe hain

    const add = (e) => {
        e.preventDefault() // form submit hone pe page reload hone se rok rahe hain

        if (!todo) return // agar todo empty hai to return kar do

        addTodo({ todo: todo, completed: false }) // naya todo add kar rahe hain aur uska completed status false set kar rahe hain
        setTodo("") // input field ko empty kar rahe hain after adding the todo
    }

    return (
        <form onSubmit={add} className="flex"> {/* form submit hone pe add function call hoga */}
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5" // input field ke liye classes for styling
                value={todo} // input field ka value state se bind kar rahe hain
                onChange={(e) => setTodo(e.target.value)} // input change hone pe state update kar rahe hain
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"> {/* button ke liye classes for styling */}
                Add
            </button>
        </form>
    );
}

export default TodoForm;
