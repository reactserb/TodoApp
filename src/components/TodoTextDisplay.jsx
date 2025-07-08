import formatDateTime from '../helpers/formatDateTime'

export default function TodoTextDisplay({ setIsEditing, todo }) {
	return (
		<div
			className='flex flex-col cursor-pointer'
			onDoubleClick={() => setIsEditing(true)}
		>
			<span
				className={`text-1 ${
					todo.completed
						? 'line-through text-gray-400'
						: 'text-gray-700 dark:text-gray-300'
				}`}
			>
				{todo.text}
			</span>

			<span className='text-xs text-gray-400'>
				Created: {formatDateTime(todo.createdAt)}
			</span>
			{todo.deadline && (
				<span
					className={`text-xs ${
						todo.completed
							? 'text-gray-500'
							: new Date(todo.deadline) < new Date()
							? 'text-red-500'
							: 'text-gray-400'
					}`}
				>
					Do it before: {formatDateTime(todo.deadline)}
				</span>
			)}
		</div>
	)
}
