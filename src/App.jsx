import { useState } from 'react'
import TodoItem from './components/TodoItem'
import ToggleTheme from './components/ToggleTheme'
import AddTodo from './components/AddTodo'
import getInitialTheme from './helpers/getInitialTheme'
import toggleTheme from './helpers/toggleTheme'

export default function App() {
	const initialTodos = [
		{
			id: 1,
			text: 'Прес качат',
		},
		{
			id: 2,
			text: 'Атжуманя',
		},
		{
			id: 3,
			text: 'Патягиваня',
		},
	]

	const [todos, setTodos] = useState(initialTodos)
	const [theme, setTheme] = useState(getInitialTheme())

	const handleDelete = id => {
		setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
	}

	const handleAdd = text => {
		const newTodo = {
			id: new Date(),
			text,
		}
		setTodos([...todos, newTodo])
	}

	return (
		<div
			data-theme={theme}
			className='flex flex-col min-h-screen justify-center items-center bg-page-light dark:bg-page-dark p-6'
		>
			<ToggleTheme toggleTheme={() => toggleTheme(setTheme)} theme={theme} />
			<div className='mx-auto flex flex-col gap-3'>
				<h1 className='text-4xl font-bold text-center text-gray-800 dark:text-white mb-8 '>
					<span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'>
						My TodoApp
					</span>
				</h1>
				<AddTodo handleAdd={handleAdd} />
				<div className='flex flex-col gap-3'>
					{todos.map(todo => (
						<TodoItem key={todo.id} todo={todo} handleDelete={handleDelete} />
					))}
				</div>
			</div>
		</div>
	)
}
