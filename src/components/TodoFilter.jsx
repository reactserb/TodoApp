export default function TodoFilter({ filter, setFilter }) {
	const buttonClasses = currentFilter =>
		`px-4 py-2 rounded transition-colors cursor-pointer ${
			filter === currentFilter
				? 'bg-blue-500 text-white'
				: 'bg-blue-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
		}`

	return (
		<div className='flex justify-center gap-2 mb-4'>
			<button onClick={() => setFilter('all')} className={buttonClasses('all')}>
				All
			</button>
			<button
				onClick={() => setFilter('active')}
				className={buttonClasses('active')}
			>
				Active
			</button>
			<button
				onClick={() => setFilter('completed')}
				className={buttonClasses('completed')}
			>
				Completed
			</button>
		</div>
	)
}
