import { ImSpinner10 } from 'react-icons/im'

export default function Loader() {
	return (
		<div className='flex justify-center items-center'>
			<div className='animate-spin text-4xl text-blue-500'>
				<ImSpinner10 />
			</div>
		</div>
	)
}
