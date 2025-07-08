import { useState } from 'react'
import DeadlineBlock from './DeadlineBlock'

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
			<DeadlineBlock
				showDeadline={showDeadline}
				deadline={deadline}
				setDeadline={setDeadline}
				setShowDeadline={setShowDeadline}
			/>
		</form>
	)
}
