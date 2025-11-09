import { useCallback, useEffect, useState, useRef } from 'react'
import CheckboxButton from './CheckboxButton'
import TodoEditForm from './TodoEditForm'
import TodoTextDisplay from './TodoTextDisplay'
import DeleteButton from './DeleteButton'
import { useSortable } from '@dnd-kit/sortable'
import { GoGrabber } from 'react-icons/go'
import { FaEdit } from 'react-icons/fa'

export default function TodoItem({
	todo,
	onDelete,
	handleToggleComplete,
	onUpdate,
}) {
	const [isEditing, setIsEditing] = useState(false)
	const [editText, setEditText] = useState(todo.text)
	const [editDeadline, setEditDeadline] = useState(todo.deadline || '')
	const editFormRef = useRef(null)
	const editButtonRef = useRef(null)

	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: todo.id })

	const style = {
		transform: transform
			? `translate(${transform.x}px, ${transform.y}px)`
			: undefined,
		transition,
		zIndedx: isDragging ? 1 : 'auto',
		opacity: isDragging ? 0.7 : 1,
	}

	const handleSave = useCallback(() => {
		if (editText.trim()) {
			onUpdate(todo.id, editText, editDeadline)
		}
		setIsEditing(false)
	}, [editText, editDeadline, todo.id, onUpdate])

	useEffect(() => {
		const handleClickOutside = e => {
			if (
				editFormRef.current &&
				!editFormRef.current.contains(e.target) &&
				editButtonRef.current &&
				!editButtonRef.current.contains(e.target)
			) {
				handleSave()
			}
		}

		if (isEditing) {
			document.addEventListener('click', handleClickOutside)
		}

		return () => document.removeEventListener('click', handleClickOutside)
	}, [isEditing, handleSave])

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			style={style}
			className='group flex justify-between items-center p-4 gap-3 bg-white dark:bg-page-dark rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100'
		>
			<div className='flex flex-row items-center gap-2 flex-grow'>
				<div
					{...listeners}
					className='cursor-grab active:cursor-grabbing text-4xl dark:text-txt-dark'
				>
					<GoGrabber />
				</div>
				<div className='flex items-center gap-3'>
					<CheckboxButton
						todo={todo}
						handleToggleComplete={handleToggleComplete}
					/>
					{isEditing ? (
						<TodoEditForm
							editFormRef={editFormRef}
							editText={editText}
							setEditText={setEditText}
							handleSave={handleSave}
							editDeadline={editDeadline}
							setEditDeadline={setEditDeadline}
						/>
					) : (
						<TodoTextDisplay todo={todo} />
					)}
				</div>
			</div>
			<div className='flex flex-col items-center gap-2 sm:flex-row'>
				{!isEditing && !todo.completed && (
					<button
						ref={editButtonRef}
						onClick={() => setIsEditing(true)}
						className='p-2 text-gray-400 hover:text-blue-500 transition-colors flex-shrink-0'
						title='Edit task'
					>
						<FaEdit />
					</button>
				)}
				<DeleteButton onDelete={onDelete} />
			</div>
		</div>
	)
}
