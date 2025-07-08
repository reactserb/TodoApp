import { FaRegTrashCan } from 'react-icons/fa6'

export default function DeleteButton({ onDelete }) {
	return (
		<button
			onClick={onDelete}
			className='opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-300 cursor-pointer'
		>
			<FaRegTrashCan className='h-5 w-5' />
		</button>
	)
}
