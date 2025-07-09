import { useState, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { useTodoActions } from './useTodoActions'
import { useApi } from './useApi'
import { useTodoHelpers } from './useTodoHelpers'

const useTodoManagement = () => {
	const [todos, setTodos] = useState([])
	const [deletingId, setDeletingId] = useState(null)
	const [isDeletingCompleted, setIsDeletingCompleted] = useState(false)

	const { saveToLocalStorage, loadFromLocalStorage } = useLocalStorage()
	const { fetchTodos, updateFetchTodo, removeTodo, createTodo } = useApi()
	const { createNewTodo, updateTodo, updateToggleComplete, sortedTodos } =
		useTodoHelpers()

	useEffect(() => {
		const loadInitialData = async () => {
			const sortedSavedTodos = sortedTodos(loadFromLocalStorage())
			setTodos(sortedSavedTodos)
			try {
				const serverTodos = await fetchTodos()
				const sortedServerTodos = sortedTodos(serverTodos)
				setTodos(sortedServerTodos)

				saveToLocalStorage(sortedServerTodos)
			} catch (err) {
				console.error('Failed to fetch', err)
			}
		}

		loadInitialData()
	}, [])

	const actions = useTodoActions({
		todos,
		setTodos,
		createNewTodo,
		createTodo,
		saveToLocalStorage,
		removeTodo,
		updateTodo,
		updateFetchTodo,
		updateToggleComplete,
		setIsDeletingCompleted,
	})

	return {
		todos,
		setTodos,
		isDeletingCompleted,
		setIsDeletingCompleted,
		deletingId,
		setDeletingId,
		...actions,
	}
}

export default useTodoManagement
