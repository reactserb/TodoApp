import { useEffect, useState, useRef } from 'react'
import DeadlineBlock from './DeadlineBlock'
import { FaPlus, FaMicrophone } from 'react-icons/fa'

export default function AddTodo({ handleAdd }) {
	const [text, setText] = useState('')
	const [deadline, setDeadline] = useState('')
	const [showDeadline, setShowDeadline] = useState(false)
	const [isListening, setIsListening] = useState(false)
	const [recognition, setRecognition] = useState(null)
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
		if (recognition) {
			recognition.stop()
			setIsListening(false)
			setText(finalTextRef.current)
			moveCursorToEnd()
		}
	}

	const startListening = () => {
		if (recognition) {
			if (inputRef.current.value) {
				finalTextRef.current = ''
			}

			recognition.start()
			setIsListening(true)
		}
	}

	const toggleListening = () => {
		if (isListening) {
			stopListening()
		} else {
			startListening()
		}
	}

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const SpeechRecognition =
				window.SpeechRecognition || window.webkitSpeechRecognition
			if (SpeechRecognition) {
				const recognitionInstance = new SpeechRecognition()
				recognitionInstance.continuous = true
				recognitionInstance.lang = 'ru-RU'
				recognitionInstance.interimResults = true

				recognitionInstance.onresult = e => {
					for (let i = e.resultIndex; i < e.results.length; i++) {
						let finalTranscript = ''
						let interimScript = ''
						const transcript = e.results[i][0].transcript
						if (e.results[i].isFinal) {
							finalTranscript += transcript
						} else {
							interimScript += transcript
						}

						if (finalTranscript) {
							finalTextRef.current =
								finalTextRef.current + ' ' + finalTranscript
							setText(finalTextRef.current)
						} else if (interimScript) {
							setText(finalTextRef.current + ' ' + interimScript)
						}
					}
					moveCursorToEnd()
				}

				recognitionInstance.onerror = e => {
					console.error('Recognize Error:', e.error)
					stopListening()
				}

				recognitionInstance.onend = e => {
					if (isListening) {
						recognitionInstance.start()
					}
				}

				setRecognition(recognitionInstance)
			}
		}

		return () => {
			if (recognition) {
				recognition.stop()
			}
		}
	}, [isListening])

	const handleSubmit = e => {
		e.preventDefault()
		if (text.trim()) {
			handleAdd(text, deadline)
		}
		setDeadline('')
		setShowDeadline(false)
		setText('')
		finalTextRef.current = ''
	}

	return (
		<form onSubmit={handleSubmit} className='mb-6'>
			<div className='flex items-center mb-2 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100  focus-within:ring-2 focus-within:ring-blue-500'>
				<input
					ref={inputRef}
					value={text}
					onChange={e => setText(e.target.value)}
					placeholder='Add task'
					className='flex-1 p-3 text-gray-700 dark:bg-page-dark dark:text-txt-dark outline-none placeholder-gray-400'
				/>
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
