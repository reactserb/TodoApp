import { useEffect, useState } from 'react'
import TodoItem from './components/TodoItem'
import ToggleTheme from './components/ToggleTheme'
import AddTodo from './components/AddTodo'
import getInitialTheme from './helpers/getInitialTheme'
import toggleTheme from './helpers/toggleTheme'

const LOCAL_STORAGE_KEY = 'todos'
const API_URL = 'https://67fe07ca3da09811b1774cfc.mockapi.io/users'

export default function App() {
	const [todos, setTodos] = useState([])
	const [theme, setTheme] = useState(getInitialTheme())

	useEffect(() => {
		const loadInitialData = async () => {
			try {
				const response = await fetch(API_URL)
				const serverTodos = await response.json()

				setTodos(serverTodos)
				localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(serverTodos))
			} catch (err) {
				console.error('Failed to fetch', err)
			}
		}

		loadInitialData()
	}, [])

	const handleToggleComplete = async id => {
		const todoUpdate = todos.find(todo => todo.id === id)
		if (!todoUpdate) return

		const updatedTodo = {
			...todoUpdate,
			completed: !todoUpdate.completed,
		}

		const updatedTodos = todos.map(todo =>
			todo.id === id ? updatedTodo : todo
		)
		setTodos(updatedTodos)

		try {
			await fetch(`${API_URL}/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedTodo),
			})
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos))
		} catch (err) {
			console.log('Error toggle complete', err)
			setTodos(todos)
		}
	}

	const handleDelete = async id => {
		const previousTodos = todos
		const updatedTodos = todos.filter(todo => todo.id !== id)
		setTodos(updatedTodos)

		try {
			await fetch(`${API_URL}/${id}`, {
				method: 'DELETE',
			})
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos))
		} catch (err) {
			console.error('Error delete', err)
			setTodos(previousTodos)
		}
	}

	const handleAdd = async (text, deadline) => {
		const newTodo = {
			id: Date.now(),
			text,
			completed: false,
			createdAt: new Date().toISOString(),
			deadline: deadline || null,
			order: todos.length + 1,
		}

		const updatedTodos = [...todos, newTodo]
		setTodos(updatedTodos)
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos))

		try {
			const response = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newTodo),
			})

			const createdTodo = await response.json()
			const syncedTodos = updatedTodos.map(todo =>
				todo.id === newTodo.id ? createdTodo : todo
			)

			setTodos(syncedTodos)
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(syncedTodos))
		} catch (err) {
			console.error('Error to add:', err)
			setTodos(todos)
		}
	}

	return (
		<div
			data-theme={theme}
			className='flex flex-col min-h-screen justify-center items-center bg-page-light dark:bg-page-dark p-6'
		>
			<ToggleTheme toggleTheme={() => toggleTheme(setTheme)} theme={theme} />
			<div className='mx-auto flex flex-col gap-3'>
				<h1 className='text-4xl font-bold text-center text-gray-800 dark:text-white mb-8 '>
					<span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'>
						My TodoApp
					</span>
				</h1>
				<AddTodo handleAdd={handleAdd} />
				<div className='flex flex-col gap-3'>
					{todos.map(todo => (
						<TodoItem
							key={todo.id}
							todo={todo}
							handleDelete={handleDelete}
							handleToggleComplete={handleToggleComplete}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
