import React, { useState } from "react";

// Handles input and display of author names

function AuthorName() {
	
	const [authorName, setAuthorName] = useState('')
	const [namelist, setNameList] = useState([])
	const [error, setError] = useState('')

	const alphabetRegex = /^[a-zA-Z]+$/

	const handleInput = (e) => {
		setAuthorName(e.target.value)
	}

	const handleSubmit = (e) => {
		setError('') // clear error

		if (!alphabetRegex.test(authorName)) {
			setError("Only alphabetic letters allowed!")
		}

		else if (authorName.length > 128) {
			setError("Name too long!")
		}

		else if (authorName.trim() !== '') {
			setNameList([...namelist, authorName.trim()])
		}

		setAuthorName('') // Clear input field
	}

	const handleKeyPress = (e) => {
		if (e.key == 'Enter') {
			handleSubmit(e)
		}
	}

	return (
		<>
			<div className="authorName">
				<h1>
					Input Author Name
				</h1>

				<input type="text" value={authorName} onChange={(e) => handleInput(e)} onKeyUp={(e) => handleKeyPress(e)} placeholder="Author name (alphabetic letters)"></input>

				<button onClick={(e) => handleSubmit(e)}>Submit</button>

				<div className="output">
					<p>{error}</p>
					
					<div className="names">
						<ol>
							{namelist.map((name, index) => (<li key={index}>{name}</li>))}
						</ol>
					</div>
				</div>
			</div>
		</>
	)
}

export default AuthorName