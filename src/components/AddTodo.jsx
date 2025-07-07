import { useState } from 'react'

export default function AddTodo({ handleAdd }) {
	const [text, setText] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		if (text.trim()) {
			handleAdd(text)
		}
		setText('')
	}

	return (
		<form onSubmit={handleSubmit} className='mb-6'>
			<div className='flex items-center bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100  focus-within:ring-2 dark:focus-within:ring-1 focus-within:ring-blue-500 dark:focus-within:ring-blue-100'>
				<input
					value={text}
					onChange={e => setText(e.target.value)}
					placeholder='Add task'
					className='flex-1 p-3 text-gray-700 dark:bg-page-dark dark:text-txt-dark  outline-none placeholder-gray-400'
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
		</form>
	)
}
