import { useEffect, useState } from 'react'
import { NetworkContext } from '../contexts/NetworkContext'

export default function NetworkProvider({ children }) {
	const [networkStatus, setNetworkStatus] = useState({
		isOnline: navigator.onLine,
		showNotification: false,
		message: '',
	})

	useEffect(() => {
		const handleOnline = () => {
			setNetworkStatus({
				isOnline: true,
				showNotification: true,
				message: 'Internet is connected',
			})
			setTimeout(() => {
				setNetworkStatus(prev => ({ ...prev, showNotification: false }))
			}, 5000)
		}

		const handleOffline = () => {
			setNetworkStatus({
				isOnline: false,
				showNotification: true,
				message: 'No internet connection',
			})
		}

		window.addEventListener('online', handleOnline)
		window.addEventListener('offline', handleOffline)

		return () => {
			window.removeEventListener('online', handleOnline)
			window.removeEventListener('offline', handleOffline)
		}
	}, [])

	return (
		<NetworkContext.Provider value={{ networkStatus }}>
			{children}
		</NetworkContext.Provider>
	)
}
