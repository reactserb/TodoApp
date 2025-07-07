import { useState } from 'react'

export default function AddTodo({ handleAdd }) {
	const [text, setText] = useState('')
	const [deadline, setDeadline] = useState('')
	const [showDeadline, setShowDeadline] = useState(false)

	const handleSubmit = e => {
		e.preventDefault()
		if (text.trim()) {
			handleAdd(text, deadline)
		}
		setDeadline('')
		setShowDeadline(false)
		setText('')
	}

	return (
		<form onSubmit={handleSubmit} className='mb-6'>
			<div className='flex items-center mb-2 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100  focus-within:ring-2 focus-within:ring-blue-500'>
				<input
					value={text}
					onChange={e => setText(e.target.value)}
					placeholder='Add task'
					className='flex-1 p-3 text-gray-700 dark:bg-page-dark dark:text-txt-dark outline-none placeholder-gray-400'
				/>
				<button
					type='submit'
					className='p-3 bg-btn-light hover:bg-btn-light-hv text-white dark:bg-btn-dark hover:dark:bg-btn-dark-hv transition-colors duration-300 cursor-pointer'
				>
					<img
						src='https://img.icons8.com/?size=100&id=37784&format=png&color=FFFFFF'
						alt='Кнопка добавить'
						className='w-6 h-6'
					/>
				</button>
			</div>
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
					className='seld-start text-sm text-green-500 hover:text-green-700'
				>
					+ Add deadline
				</button>
			)}
		</form>
	)
}
