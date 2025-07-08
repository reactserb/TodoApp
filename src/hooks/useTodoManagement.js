import { useState, useEffect } from 'react'

const LOCAL_STORAGE_KEY = 'todos'
const API_URL = 'https://67fe07ca3da09811b1774cfc.mockapi.io/users'

const useTodoManagement = () => {
	const [todos, setTodos] = useState([])
	const [deletingId, setDeletingId] = useState(null)
	const [isDeletingCompleted, setIsDeletingCompleted] = useState(false)

	useEffect(() => {
		const loadInitialData = async () => {
			try {
				const response = await fetch(API_URL)
				if (response.ok) {
					const serverTodos = await response.json()
					setTodos(serverTodos)

					localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(serverTodos))
				}
			} catch (err) {
				console.error('Failed to fetch', err)
			}
		}

		loadInitialData()
	}, [])

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

	const handleUpdate = async (id, newText, newDeadline) => {
		const todoToUpddate = todos.find(todo => todo.id === id)

		if (!todoToUpddate) return

		const updatedTodo = {
			...todoToUpddate,
			text: newText,
			deadline: newDeadline,
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

	const hasCompletedTodos = todos.some(todo => todo.completed)

	const handleDeleteCompletedTodos = () => {
		if (!hasCompletedTodos) return

		setIsDeletingCompleted(true)
	}

	const confirmDeleteCompleted = async () => {
		const originalTodos = [...todos]

		const completedIds = originalTodos.filter(t => t.completed).map(t => t.id)

		setTodos(originalTodos.filter(todo => !todo.completed))

		const failedIds = []

		for (const id of completedIds) {
			try {
				await fetch(`${API_URL}/${id}`, {
					method: 'DELETE',
				})
			} catch (err) {
				console.error(`Error delete ${id}`, err)
				failedIds.push(id)
			}
		}

		if (failedIds.length > 0) {
			setTodos(
				originalTodos.filter(
					todo => !todo.completed || failedIds.includes(todo.id)
				)
			)
		}

		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
		setIsDeletingCompleted(false)
	}

	return {
		todos,
		setTodos,
		handleAdd,
		handleUpdate,
		handleToggleComplete,
		handleDelete,
		handleDeleteCompletedTodos,
		confirmDeleteCompleted,
		hasCompletedTodos,
		isDeletingCompleted,
		setIsDeletingCompleted,
		deletingId,
		setDeletingId,
	}
}

export default useTodoManagement
