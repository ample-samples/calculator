/* 
 * High-level breakdown
 * The calculator (at a minimum) will:
 * - Take input from the user using buttons
 * - Store the input in state and update it as buttons are pressed
 * - Parse this state and evaluate the result
 * - Display it to the user
 *
 * It will support (at a minimum):
 * - add subtract multiply and divide
 * - Indices
 * - Clear user input area
 *
 * optionally:
 * - Trig functions
 * - 
*/

type State = {
	display: string | null,
	operation: "add" | "subtract" | "multiply" | "divide" | null,
	memory: number | null
}

// init globals
const displayEl = document.querySelector<HTMLElement>('#display')
if (!displayEl) {
	throw new Error("Oopsie")
}

// init state
let state: State = {display: null, operation: null, memory: null}

const refreshDisplay = () => {
	// 1. read display state
	// 2. write to display element
	if (!state.display) {
		displayEl.innerText = "Calculate me baby"
	} else {
		displayEl.innerText = state.display
	}
}

const addChar = (char: string) => {
	const currentDisplay = state.display
	if (currentDisplay) {
		state = {...state, display: currentDisplay + char}
	} else {
		state = {...state, display: char}
	}
	console.log(state)
	refreshDisplay()
}

refreshDisplay()
