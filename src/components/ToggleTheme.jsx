import NetworkProvider from '../Providers/NetworkProvider'
import Notification from './Notification'
import { FaMoon } from 'react-icons/fa'
import { BsSunFill } from 'react-icons/bs'

export default function ToggleTheme({ toggleTheme, theme }) {
	return (
		<div className='mb-6'>
			<div className='flex items-center'>
				<button onClick={toggleTheme} className='relative cursor-pointer'>
					<div className='w-14 h-7 flex rounded-full shadow-inner transition-color duration-300 bg-gray-300 dark:bg-btn-dark'></div>
					<div className='absolute flex items-center justify-center top-0.5 left-0.5 w-6 h-6 bg-blue-700 dark:bg-white rounded-full shadow-md transition-transform duration-300 translate-x-0 dark:translate-x-7'>
						{theme === 'light' ? (
							<BsSunFill className='text-white' />
						) : (
							<FaMoon className='text-blue-700' />
						)}
					</div>
				</button>
			</div>
			<NetworkProvider>
				<Notification />
			</NetworkProvider>
		</div>
	)
}
