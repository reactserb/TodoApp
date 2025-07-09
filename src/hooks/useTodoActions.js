export const useTodoActions = ({
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
}) => {
	const handleAdd = async (text, deadline) => {
		const newTodo = createNewTodo(text, deadline, todos.length + 1)

		const updatedTodos = [...todos, newTodo]
		setTodos(updatedTodos)
		saveToLocalStorage(updatedTodos)

		try {
			const createdTodo = await createTodo(newTodo)
			const syncedTodos = updatedTodos.map(todo =>
				todo.id === newTodo.id ? createdTodo : todo
			)

			setTodos(syncedTodos)
			saveToLocalStorage(syncedTodos)
		} catch (err) {
			console.error('Error to add:', err)
			setTodos(todos)
		}
	}

	const handleDelete = async id => {
		const previousTodos = todos
		const updatedTodos = todos.filter(todo => todo.id !== id)
		setTodos(updatedTodos)

		try {
			await removeTodo(id)
			saveToLocalStorage(updatedTodos)
		} catch (err) {
			console.error('Error delete', err)
			setTodos(previousTodos)
		}
	}

	const handleUpdate = async (id, newText, newDeadline) => {
		const todoToUpddate = todos.find(todo => todo.id === id)

		if (!todoToUpddate) return

		const updatedTodo = updateTodo(newText, newDeadline, todoToUpddate)

		const updatedTodos = todos.map(todo =>
			todo.id === id ? updatedTodo : todo
		)
		setTodos(updatedTodos)

		try {
			await updateFetchTodo(id, updatedTodo)
			saveToLocalStorage(updatedTodos)
		} catch (err) {
			console.log('Error toggle complete', err)
			setTodos(todos)
		}
	}

	const handleToggleComplete = async id => {
		const todoUpdate = todos.find(todo => todo.id === id)
		if (!todoUpdate) return

		const updatedTodo = updateToggleComplete(todoUpdate)

		const updatedTodos = todos.map(todo =>
			todo.id === id ? updatedTodo : todo
		)
		setTodos(updatedTodos)

		try {
			await updateFetchTodo(id, updatedTodo)
			saveToLocalStorage(updatedTodos)
		} catch (err) {
			console.log('Error toggle complete', err)
			setTodos(todos)
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
				await removeTodo(id)
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

		saveToLocalStorage(todos)
		setIsDeletingCompleted(false)
	}

	const onReorder = async (activeId, overId) => {
		if (!overId) return

		try {
			const activeIndex = todos.findIndex(t => t.id === activeId)
			const overIndex = todos.findIndex(t => t.id === overId)

			if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex)
				return

			const newTodos = [...todos]
			const [movedTodo] = newTodos.splice(activeIndex, 1)
			newTodos.splice(overIndex, 0, movedTodo)

			const updatedTodos = newTodos.map((todo, index) => ({
				...todo,
				order: index + 1,
			}))

			setTodos(updatedTodos)

			for (const todo of updatedTodos) {
				try {
					await updateFetchTodo(todo.id, { order: todo.order })
				} catch (error) {
					console.error(`Error updated ${todo.id}`, error)
				}
			}
			saveToLocalStorage(updatedTodos)
		} catch (err) {
			console.error('Error change index', err)
			setTodos(todos)
		}
	}

	return {
		handleAdd,
		handleDelete,
		handleUpdate,
		handleToggleComplete,
		handleDeleteCompletedTodos,
		confirmDeleteCompleted,
		hasCompletedTodos,
		onReorder,
	}
}
