export default function DeadlineBlock({
	showDeadline,
	deadline,
	setDeadline,
	setShowDeadline,
}) {
	return (
		<>
			{showDeadline && (
				<div className='flex items-center gap-2 text-gray-400'>
					<input
						type='datetime-local'
						value={deadline}
						onChange={e => setDeadline(e.target.value)}
						className='p-2 border border-blue-700 rounded flex-1'
					/>
					<button
						type='button'
						onClick={() => {
							setDeadline('')
							setShowDeadline(false)
						}}
						className='p-2 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer'
					>
						Cancel
					</button>
				</div>
			)}
			{!showDeadline && (
				<button
					type='button'
					onClick={() => setShowDeadline(true)}
					className='self-start text-sm text-green-500 hover:text-green-700'
				>
					+ Add deadline
				</button>
			)}
		</>
	)
}
