export const useTodoHelpers = () => {
	const sortedTodos = todos => {
		return [...todos].sort((a, b) => a.order - b.order)
	}

	const createNewTodo = (text, deadline, order) => ({
		id: Date.now(),
		text,
		completed: false,
		createdAt: new Date().toISOString(),
		deadline: deadline || null,
		order,
	})

	const updateTodo = (newText, newDeadline, todo) => ({
		...todo,
		text: newText,
		deadline: newDeadline,
	})

	const updateToggleComplete = todo => ({
		...todo,
		completed: !todo.completed,
	})

	return { createNewTodo, updateTodo, updateToggleComplete, sortedTodos }
}
