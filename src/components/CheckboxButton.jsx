import { BsCheck2 } from 'react-icons/bs'

export default function CheckboxButton({ handleToggleComplete, todo }) {
	return (
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
	)
}
