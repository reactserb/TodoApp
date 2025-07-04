export default function TodoItem({ todo, handleDelete }) {
	return (
		<div>
			<div>
				<button>Checked</button>
				<span>{todo.text}</span>
			</div>
			<button onClick={() => handleDelete(todo.id)}>Delete</button>
		</div>
	)
}
