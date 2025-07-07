import { FaRegTrashCan } from 'react-icons/fa6'
import { BsCheck2 } from 'react-icons/bs'

export default function TodoItem({ todo, handleDelete, handleToggleComplete }) {
	return (
		<div className='group flex items-center justify-between p-4 gap-3 bg-white dark:bg-page-dark rounded-lg h-12 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100'>
			<div className='flex items-center gap-3'>
				<button
					onClick={() => handleToggleComplete(todo.id)}
					className={`p-1 rounded-full border-2 cursor-pointer ${
						todo.completed
							? 'border-green-500 bg-green-500 text-white'
							: 'border-gray-300 hover: border-gray-400'
					} transition-colors duration-300`}
				>
					<BsCheck2
						className={`h-5 w-5 ${
							todo.completed ? 'text-white' : 'dark:text-gray-300'
						}`}
					/>
				</button>
				<span
					className={`text-1 ${
						todo.completed
							? 'line-through text-gray-400'
							: 'text-gray-700 dark:text-gray-300'
					}`}
				>
					{todo.text}
				</span>
				<div className='flex flex-col'>
					<span className='text-xs text-gray-400'>
						Created:{' '}
						{new Date(todo.createdAt).toLocaleString('ru-RU', {
							day: 'numeric',
							month: 'long',
							year: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						})}
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
							Do it before:{' '}
							{new Date(todo.deadline).toLocaleString('ru-RU', {
								day: 'numeric',
								month: 'long',
								year: 'numeric',
								hour: '2-digit',
								minute: '2-digit',
							})}
						</span>
					)}
				</div>
			</div>
			<button
				onClick={() => handleDelete(todo.id)}
				className='opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-300 cursor-pointer'
			>
				<FaRegTrashCan className='h-5 w-5' />
			</button>
		</div>
	)
}
