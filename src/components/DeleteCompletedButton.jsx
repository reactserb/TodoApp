export default function DeleteCompletedButton({ handleDeleteCompletedTodos }) {
	return (
		<button
			onClick={handleDeleteCompletedTodos}
			className='px-4 py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer'
		>
			Delete completed todos
		</button>
	)
}
