import { useState } from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'
import { BsCheck2 } from 'react-icons/bs'

export default function TodoItem({ todo, handleDelete }) {
	const [isCompleted, setIsCompleted] = useState(false)

	return (
		<div className='group flex items-center justify-between p-4 gap-3 bg-white dark:bg-page-dark rounded-lg h-12 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100'>
			<div className='flex items-center gap-3'>
				<button
					onClick={() => setIsCompleted(!isCompleted)}
					className={`p-1 rounded-full border-2 cursor-pointer ${
						isCompleted
							? 'border-green-500 bg-green-500 text-white'
							: 'border-gray-300 hover: border-gray-400'
					} transition-colors duration-300`}
				>
					<BsCheck2
						className={`h-5 w-5 ${
							isCompleted ? 'text-white' : 'dark:text-gray-300'
						}`}
					/>
				</button>
				<span
					className={`text-1 ${
						isCompleted
							? 'line-through text-gray-400'
							: 'text-gray-700 dark:text-gray-300'
					}`}
				>
					{todo.text}
				</span>
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
