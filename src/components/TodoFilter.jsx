import { FaAlignJustify, FaRegCircleCheck } from 'react-icons/fa6'
import { FaRegCircle } from 'react-icons/fa'

export default function TodoFilter({ filter, setFilter }) {
	const buttonClasses = currentFilter =>
		`flex items-center px-4 py-2 rounded transition-colors duration-150 cursor-pointer ${
			filter === currentFilter
				? 'bg-blue-500 text-white'
				: 'bg-blue-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
		}`

	return (
		<div className='flex justify-center flex-row gap-2 mb-4 text-xl'>
			<button onClick={() => setFilter('all')} className={buttonClasses('all')}>
				<FaAlignJustify />
			</button>
			<button
				onClick={() => setFilter('active')}
				className={buttonClasses('active')}
			>
				<FaRegCircle />
			</button>
			<button
				onClick={() => setFilter('completed')}
				className={buttonClasses('completed')}
			>
				<FaRegCircleCheck />
			</button>
		</div>
	)
}
