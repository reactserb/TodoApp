import { BsCheck2 } from 'react-icons/bs'

export default function TodoEditForm({
	editFormRef,
	editText,
	setEditText,
	handleSave,
	editDeadline,
	setEditDeadline,
}) {
	return (
		<div className='flex flex-col w-full gap-2 items-stretch' ref={editFormRef}>
			<input
				className='w-full sm:flex-1 px-2 py-1 border-2 border-blue-500 rounded text-sm text-gray-700 dark:text-gray-300'
				type='text'
				value={editText}
				onChange={e => setEditText(e.target.value)}
				onKeyDown={e => e.key === 'Enter' && handleSave()}
			/>

			<div className='flex flex-col sm:flex-row gap-2 w-full'>
				<input
					className='w-full px-2 py-1 border-2 border-blue-500 rounded text-sm text-gray-700 dark:text-gray-300'
					type='datetime-local'
					value={editDeadline}
					onChange={e => setEditDeadline(e.target.value)}
				/>
				<button
					onClick={handleSave}
					className='flex items-center justify-center gap-1 px-2 py-1 sm:px-3 sm:py-1 text-green-600 hover:text-green-800 bg-white border-2 border-green-500 rounded hover:bg-green-50 transition-colors text-sm sm:text-base cursor-pointer'
				>
					<BsCheck2 />
					<span className='sm:hidden'>OK</span>
					<span className='hidden sm:inline'>Complete</span>
				</button>
			</div>
		</div>
	)
}
