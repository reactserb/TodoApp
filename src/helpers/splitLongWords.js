const splitLongWords = (text, maxLength = 18) => {
	return text
		.split(' ')
		.map(word => {
			if (word.length <= maxLength) {
				return word
			}

			return word.match(new RegExp(`(.{1,${maxLength}})`, 'g')).join('\u00AD')
		})
		.join(' ')
}

export default splitLongWords
