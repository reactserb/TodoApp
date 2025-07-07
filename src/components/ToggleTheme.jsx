export default function ToggleTheme({ toggleTheme, theme }) {
	return (
		<div className='mb-6'>
			<div className='flex items-center '>
				<button onClick={toggleTheme} className='relative cursor-pointer'>
					<div className='w-14 h-7 rounded-full shadow-inner transition-color duration-300 bg-gray-300 dark:bg-btn-dark'></div>
					<div className='absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 translate-x-0 dark:translate-x-7'></div>
				</button>
				<span className='ml-3 text-gray-700 dark:text-gray-300 font-medium'>
					{theme === 'light' ? 'light' : 'dark'}
				</span>
			</div>
		</div>
	)
}
