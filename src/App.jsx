import { useState } from 'react'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
import getInitialTheme from './helpers/getInitialTheme'

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

	const toggleTheme = () => {
		setTheme(prevTheme => {
			const newTheme = prevTheme === 'light' ? 'dark' : 'light'
			localStorage.setItem('theme', newTheme)
			return newTheme
		})
	}

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
			className='flex flex-col min-h-screen justify-center items-center bg-page-light dark:bg-page-dark p-6 text-page-dark dark:text-page-light'
		>
			<div className='mb-6'>
				<div className='flex items-center cursor-pointer'>
					<button onClick={toggleTheme} className='relative'>
						<div className='w-14 h-7 rounded-full shadow-inner transition-color duration-300 bg-gray-300 dark:bg-btn-dark'></div>
						<div className='absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 translate-x-0 dark:translate-x-7'></div>
					</button>
					<span className='ml-3 text-gray-700 dark:text-gray-300 font-medium'>
						{theme === 'light' ? 'light' : 'dark'}
					</span>
				</div>
			</div>
			<div className='mx-auto flex flex-col gap-3'>
				<h1 className='text-4xl font-bold text-center text-gray-800 dark:text-white mb-8 '>
					<span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'>
						My TodoApp
					</span>
				</h1>
				<AddTodo handleAdd={handleAdd} />
				<div>
					{todos.map(todo => (
						<TodoItem key={todo.id} todo={todo} handleDelete={handleDelete} />
					))}
				</div>
			</div>
		</div>
	)
}
