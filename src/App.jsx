import { lazy, Suspense, useState } from 'react'
import ToggleTheme from './components/ToggleTheme'
import getInitialTheme from './helpers/getInitialTheme'
import toggleTheme from './helpers/toggleTheme'
import DeleteModal from './components/DeleteModal'
import useTodoManagement from './hooks/useTodoManagement'
import DeleteCompletedButton from './components/DeleteCompletedButton'
import Loader from './components/Loader'

const MainContent = lazy(() => import('./components/MainContent'))

export default function App() {
	const [theme, setTheme] = useState(getInitialTheme())

	const {
		todos,
		handleAdd,
		handleUpdate,
		handleToggleComplete,
		handleDelete,
		handleDeleteCompletedTodos,
		confirmDeleteCompleted,
		hasCompletedTodos,
		isDeletingCompleted,
		setIsDeletingCompleted,
		deletingId,
		setDeletingId,
		onReorder,
	} = useTodoManagement()

	return (
		<div
			data-theme={theme}
			className='flex flex-col min-h-screen justify-center items-center bg-page-light dark:bg-page-dark p-6'
		>
			<div className='w-full max-w-xl mx-auto flex flex-col items-center'>
				<ToggleTheme toggleTheme={() => toggleTheme(setTheme)} theme={theme} />
				<Suspense fallback={<Loader />}>
					<MainContent
						todos={todos}
						handleAdd={handleAdd}
						handleToggleComplete={handleToggleComplete}
						handleUpdate={handleUpdate}
						setDeletingId={setDeletingId}
						onReorder={onReorder}
					/>
				</Suspense>
				{deletingId && (
					<DeleteModal
						onCancel={() => setDeletingId(null)}
						onConfirm={() => {
							handleDelete(deletingId)
							setDeletingId(null)
						}}
						message='Are you sure you want to delete this todo?'
					/>
				)}
				{isDeletingCompleted && (
					<DeleteModal
						onCancel={() => setIsDeletingCompleted(false)}
						onConfirm={confirmDeleteCompleted}
						message={`Are you sure you want to delete completed todos (${
							todos.filter(todo => todo.completed).length
						})?`}
					/>
				)}
				{hasCompletedTodos && (
					<DeleteCompletedButton
						handleDeleteCompletedTodos={handleDeleteCompletedTodos}
					/>
				)}
			</div>
		</div>
	)
}
