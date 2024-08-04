import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext';

function TodoItem({ todo }) {

    const [isTodoEditable, setIsTodoEditable] = useState(false) // todo editable hai ya nahi uska state
    const [todoMsg, setTodoMsg] = useState(todo.todo) // todo message ka state

    const { toggleComplete, updateTodo, deleteTodo } = useTodo() // context se functions le rahe hain

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg }) // todo update karne ka function
        setIsTodoEditable(false) // editable mode se exit
    }

    const toggleCompleted = () => {
        toggleComplete(todo.id) // completed status toggle karne ka function
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`} // different background color based on completed status
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed} // checkbox status
                onChange={toggleCompleted} // toggleComplete function call on change
                disabled = {isTodoEditable}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`} // conditional styling based on edit mode and completed status
                value={todoMsg} // input value
                onChange={(e) => setTodoMsg(e.target.value)} // input change pe state update
                readOnly={!isTodoEditable} // readOnly mode agar editable nahi hai to
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return; // completed todo ko edit nahi kar sakte

                    if (isTodoEditable) {
                        editTodo(); // edit mode me save function call
                     } else setIsTodoEditable((prev) => !prev); // edit mode toggle
                }}
                disabled={todo.completed} // button disable agar todo completed hai
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)} // delete function call on click
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
