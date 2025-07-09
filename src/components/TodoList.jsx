import TodoItem from './TodoItem'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

export default function TodoList({
	todos,
	handleToggleComplete,
	handleUpdate,
	setDeletingId,
	onReorder,
}) {
	const handleDragEnd = e => {
		const { active, over } = e
		if (!over || active.id !== over.id) {
			onReorder(active.id, over?.id)
		}
	}

	return (
		<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext
				items={todos.map(t => t.id)}
				strategy={verticalListSortingStrategy}
			>
				<div className='flex flex-col gap-3'>
					{todos.map(todo => (
						<TodoItem
							key={todo.id}
							todo={todo}
							onDelete={() => setDeletingId(todo.id)}
							handleToggleComplete={handleToggleComplete}
							onUpdate={handleUpdate}
						/>
					))}
				</div>
			</SortableContext>
		</DndContext>
	)
}
