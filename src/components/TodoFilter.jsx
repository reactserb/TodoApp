export default function TodoFilter({ filter, setFilter }) {
	const buttonClasses = currentFilter =>
		`flex items-center justify-center px-4 py-2 rounded transition-colors duration-150 cursor-pointer ${
			filter === currentFilter
				? 'bg-blue-500 text-white'
				: 'bg-blue-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
		}`

	return (
		<div className='flex flex-col justify-center gap-2 mb-4 sm:flex-row'>
			<button onClick={() => setFilter('all')} className={buttonClasses('all')}>
				Все
			</button>
			<button
				onClick={() => setFilter('active')}
				className={buttonClasses('active')}
			>
				Не выполненные
			</button>
			<button
				onClick={() => setFilter('completed')}
				className={buttonClasses('completed')}
			>
				Выполненные
			</button>
		</div>
	)
}
