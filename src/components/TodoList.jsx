import TodoItem from './TodoItem'

export default function TodoList({
	todos,
	handleToggleComplete,
	handleUpdate,
	setDeletingId,
}) {
	return (
		<div className='flex flex-col gap-3'>
			{todos.map(todo => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onDelete={() => setDeletingId(todo.id)}
					handleToggleComplete={handleToggleComplete}
					onUpdate={handleUpdate}
				/>
			))}
		</div>
	)
}
