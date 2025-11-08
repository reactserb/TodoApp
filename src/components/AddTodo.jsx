import { useEffect, useState, useRef } from 'react'
import DeadlineBlock from './DeadlineBlock'
import { FaPlus, FaMicrophone } from 'react-icons/fa'

export default function AddTodo({ handleAdd }) {
	const [text, setText] = useState('')
	const [deadline, setDeadline] = useState('')
	const [showDeadline, setShowDeadline] = useState(false)
	const [isListening, setIsListening] = useState(false)
	// const [recognition, setRecognition] = useState(null)
	const finalTextRef = useRef('')
	const inputRef = useRef(null)

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
		setText(finalTextRef.current)
		moveCursorToEnd()
	}

	const startListening = () => {
		if (inputRef.current.value) {
			finalTextRef.current = ''
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

		// Если API не поддерживается, выходим и, возможно, скрываем кнопку
		if (!SpeechRecognition) {
			console.warn('Speech Recognition API not supported in this browser.')
			// Можете добавить useState(false) для кнопки микрофона и скрыть ее здесь
			return
		}

		const recognitionInstance = new SpeechRecognition()
		recognitionInstance.continuous = true
		recognitionInstance.lang = 'ru-RU'
		recognitionInstance.interimResults = true

		recognitionInstance.onresult = e => {
			let finalTranscript = ''
			let interimScript = ''

			for (let i = e.resultIndex; i < e.results.length; i++) {
				const transcript = e.results[i][0].transcript
				if (e.results[i].isFinal) {
					finalTranscript += transcript
				} else {
					interimScript += transcript
				}
			}

			if (finalTranscript) {
				// Улучшенная обработка пробелов
				finalTextRef.current = (
					finalTextRef.current +
					' ' +
					finalTranscript
				).trim()
				setText(finalTextRef.current)
			} else if (interimScript) {
				// Обновляем UI с промежуточным результатом, сохраняя финальный в ref
				setText((finalTextRef.current + ' ' + interimScript).trim())
			}
			moveCursorToEnd()
		}

		recognitionInstance.onerror = e => {
			console.error('Recognize Error:', e.error)
			// Если произошла ошибка, убедитесь, что isListening выключено
			setIsListening(false)
		}

		// Запускаем или останавливаем инстанс в зависимости от isListening
		if (isListening) {
			recognitionInstance.start()
		} else {
			// Если isListening false, останавливаем, если он уже запущен
			// (onend вызовется автоматически, но мы его не перехватываем для перезапуска тут)
			recognitionInstance.stop()
		}

		// КОРРЕКТНАЯ ОЧИСТКА ЭФФЕКТА
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
			finalTextRef.current = ''
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
						Recording in progress... Push the microphone to stop
					</span>
				</div>
			)}
		</form>
	)
}
