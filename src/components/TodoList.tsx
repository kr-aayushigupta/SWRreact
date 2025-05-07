'use client'

import useSWR, { mutate, cache } from 'swr'
import { useState } from 'react'
import { fetcher } from '../utils/fetcher'

interface Todo {
  id: number
  task: string
}

const TodoList = () => {
  const { data: todos, error, isLoading } = useSWR<Todo[]>('/api/todos', fetcher)
  console.log("🚀 ~ TodoList ~ todos:", todos)

  // const updatedData = { message: "New data!" };
  // cache.set('api/todos',updatedData)

  

  const [newTask, setNewTask] = useState('')

  const handleAddTodo = async () => {
    if (!newTask.trim()) return

    const newTodo = { id: Date.now(), task: newTask }

    // Optimistically update UI
    mutate('/api/todos', [...(todos || []), newTodo], false)

    // Send to server
    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ task: newTask }),
      headers: { 'Content-Type': 'application/json' },
    })

    // Revalidate data
    mutate('/api/todos')

    setNewTask('')
  }

  if (isLoading) return <p>Loading...</p>
  // if (error) return <p>Error loading todos</?p>

  // const cachedData = cache.get('/api/todos');
  // console.log(cachedData);

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Todo List</h1>

      <ul className="space-y-2">
        {todos?.map(todo => (
          <li key={todo.id} className="border p-2 rounded">{todo.task}</li>
        ))}
      </ul>

      <div className="flex space-x-2 mt-4">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
          className="border p-2 rounded flex-grow"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      
    </div>




  )
}

export default TodoList
