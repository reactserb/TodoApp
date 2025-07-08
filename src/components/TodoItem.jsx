import { useCallback, useEffect, useRef, useState } from 'react'
import CheckboxButton from './CheckboxButton'
import TodoEditForm from './TodoEditForm'
import TodoTextDisplay from './TodoTextDisplay'
import DeleteButton from './DeleteButton'

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

	const handleSave = useCallback(() => {
		if (editText.trim()) {
			onUpdate(todo.id, editText, editDeadline)
		}
		setIsEditing(false)
	}, [editText, editDeadline, todo.id, onUpdate])

	useEffect(() => {
		const handleClickOutside = e => {
			if (editFormRef.current && !editFormRef.current.contains(e.target)) {
				handleSave()
			}
		}

		if (isEditing) {
			document.addEventListener('click', handleClickOutside)
		}

		return () => document.removeEventListener('click', handleClickOutside)
	}, [isEditing, handleSave])

	return (
		<div className='group flex items-center justify-between p-4 gap-3 bg-white dark:bg-page-dark rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100'>
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
					<TodoTextDisplay setIsEditing={setIsEditing} todo={todo} />
				)}
			</div>
			<DeleteButton onDelete={onDelete} />
		</div>
	)
}
