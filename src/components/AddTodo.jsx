import { useState } from 'react'

export default function AddTodo({ handleAdd }) {
	const [text, setText] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		if (text.trim()) {
			handleAdd(text)
		}
		setText('')
	}

	return (
		<form onSubmit={handleSubmit}>
			<input value={text} onChange={e => setText(e.target.value)} />
			<button type='submit'>Add new todo</button>
		</form>
	)
}
