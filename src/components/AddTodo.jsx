import { useEffect, useState, useRef } from 'react'
import DeadlineBlock from './DeadlineBlock'
import { FaPlus, FaMicrophone } from 'react-icons/fa'

export default function AddTodo({ handleAdd }) {
	const [text, setText] = useState('')
	const [deadline, setDeadline] = useState('')
	const [showDeadline, setShowDeadline] = useState(false)
	const [isListening, setIsListening] = useState(false)
	const inputRef = useRef(null)

	const isListeningRef = useRef(isListening)
	useEffect(() => {
		isListeningRef.current = isListening
	}, [isListening])

	const moveCursorToEnd = () => {
		if (inputRef.current) {
			inputRef.current.focus()
			const length = inputRef.current.value.length
			inputRef.current.setSelectionRange(length, length)
			inputRef.current.scrollLeft = inputRef.current.scrollWidth
		}
	}

	const stopListening = () => {
		setIsListening(false)
		moveCursorToEnd()
	}

	const startListening = () => {
		if (inputRef.current.value) {
			setText('')
		}
		setIsListening(true)
	}

	const toggleListening = () => {
		if (isListening) {
			stopListening()
		} else {
			startListening()
		}
	}

	useEffect(() => {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition

		if (!SpeechRecognition) {
			console.warn('Speech Recognition API not supported in this browser.')
			return
		}

		const recognitionInstance = new SpeechRecognition()
		recognitionInstance.continuous = true // Продолжаем слушать
		recognitionInstance.lang = 'ru-RU'
		recognitionInstance.interimResults = true // Нужны промежуточные результаты для плавного ввода

		recognitionInstance.onresult = e => {
			let latestTranscript = ''
			// Получаем последнюю транскрипцию из *последнего* результата
			// e.results.length - 1 всегда даст вам последний набор результатов в текущем событии
			const lastResultIndex = e.results.length - 1
			latestTranscript = e.results[lastResultIndex][0].transcript

			// Всегда устанавливаем UI в последний полученный транскрипт.
			// Это предотвращает дублирование текста.
			setText(latestTranscript.trim())
			moveCursorToEnd()
		}

		recognitionInstance.onerror = e => {
			console.error('Recognize Error:', e.error)
			if (isListeningRef.current) {
				setIsListening(false)
			}
		}

		recognitionInstance.onend = () => {
			// Если прослушивание остановилось не по нашей команде (например, из-за таймаута),
			// обновляем состояние.
			if (isListeningRef.current) {
				console.log(
					'Recognition ended unexpectedly. Restarting if needed or updating state.'
				)
				setIsListening(false)
			}
		}

		if (isListening) {
			try {
				recognitionInstance.start()
			} catch (err) {
				console.error('Recognition start error:', err)
				setIsListening(false)
			}
		} else {
			recognitionInstance.stop()
		}

		return () => {
			recognitionInstance.stop()
		}
	}, [isListening])

	const handleSubmit = e => {
		e.preventDefault()
		if (text.trim()) {
			handleAdd(text, deadline)
			setDeadline('')
			setShowDeadline(false)
			setText('')
		} else {
			alert('Enter the task text')
		}
	}

	return (
		<form onSubmit={handleSubmit} className='mb-6'>
			<div className='flex items-center mb-4 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 focus-within:ring-2 focus-within:ring-blue-500'>
				<input
					ref={inputRef}
					value={text}
					onChange={e => setText(e.target.value)}
					placeholder='Add task'
					className='flex-1 p-3 text-gray-700 dark:bg-page-dark dark:text-txt-dark outline-none placeholder-gray-400 min-w-0'
				/>
				<div className='flex-shrink-0 flex'>
					<button
						onClick={toggleListening}
						type='button'
						className={`p-3.5 text-xl cursor-pointer ${
							isListening
								? 'bg-red-500 text-white'
								: 'bg-white dark:bg-gray-300 hover:bg-gray-300 dark:hover:bg-gray-400'
						} transition-colors duration-300 flex items-center justify-center`}
						title={isListening ? 'Stop voice' : 'Start new voice'}
					>
						<FaMicrophone />
					</button>
					<button
						type='submit'
						disabled={isListening}
						className={`p-4 ${
							isListening
								? 'bg-gray-300 cursor-not-allowed'
								: 'bg-btn-light hover:bg-btn-light-hv text-white dark:bg-btn-dark hover:dark:bg-btn-dark-hv transition-colors duration-300 cursor-pointer'
						}`}
					>
						<FaPlus />
					</button>
				</div>
			</div>
			<DeadlineBlock
				showDeadline={showDeadline}
				deadline={deadline}
				setDeadline={setDeadline}
				setShowDeadline={setShowDeadline}
			/>
			{isListening && (
				<div className='mt-2 text-sm text-blue-500 flex items-center'>
					<div className='w-3 h-3 rounded-full bg-red-500 mr-2'></div>
					<span className='animate-pulse'>
						{' '}
						Recording in progress... Push the microphone to stop{' '}
					</span>
				</div>
			)}
		</form>
	)
}
