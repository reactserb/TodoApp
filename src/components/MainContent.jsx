import Header from './Header'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import TodoFilter from './TodoFilter'
import { useState } from 'react'

export default function MainContent({
	todos,
	handleAdd,
	handleToggleComplete,
	handleUpdate,
	setDeletingId,
	onReorder,
}) {
	const [filter, setFilter] = useState('all')

	const filteredTodos = todos.filter(todo => {
		if (filter === 'active') return !todo.completed
		if (filter === 'completed') return todo.completed
		return true
	})

	return (
		<div className='mx-auto flex flex-col gap-3'>
			<Header />
			<AddTodo handleAdd={handleAdd} />
			<TodoFilter filter={filter} setFilter={setFilter} />
			<TodoList
				todos={filteredTodos}
				handleToggleComplete={handleToggleComplete}
				handleUpdate={handleUpdate}
				setDeletingId={setDeletingId}
				onReorder={onReorder}
			/>
		</div>
	)
}
