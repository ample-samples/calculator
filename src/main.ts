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

type Operator = "add" | "subtract" | "multiply" | "divide" | null

type State = {
  display: string | null;
  operation: Operator;
  memory: number | null;
  lastInput: number | null;
}

// init globals
const displayEl = document.querySelector<HTMLElement>('#display')
if (!displayEl) throw new Error("Oopsie")

// init state
let state: State = { display: null, operation: null, memory: null, lastInput: null }

const refreshDisplay = () => {
  // 1. read display state
  // 2. write to display element
  if (!state.display) {
    displayEl.innerText = "0"
  } else {
    displayEl.innerText = state.display
  }
  if (state.display === "8008135" || state.display === "80085") {
    console.log("Nice one")
    displayEl.style.color = "transparent";
    displayEl.style.textShadow = "0 0 6px #000";
  } else {
    displayEl.style.color = "inherit";
    displayEl.style.textShadow = "none";
  }
  console.log(state)
}

const clear = () => {
  console.log("clearing")
  state.display = null
  state.memory = null
  state.operation = null
  refreshDisplay()
}

const addChar = (char: string) => {
  const currentDisplay = state.display
  if (currentDisplay) {
    state = { ...state, display: currentDisplay + char }
  } else {
    state = { ...state, display: char }
  }
	state.lastInput = Number(state.display)
  refreshDisplay()
}

const backspace = () => {
  if (state.display === null || state.display.length === 1) {
    state.display = null
  } else {
    state = { ...state, display: state.display.substring(0, state.display.length - 1) }
  }
  refreshDisplay()
}

const addOperator = (operator: Operator) => {
  state.operation = operator
  state.memory = Number(state.display)
  state.lastInput = Number(state.display)
  state.display = null
}

const evaluate = () => {
  if (!state.memory) return null;
  if (state.display !== null) {
    switch (state.operation) {
      case "divide":
        state = { ...state, display: (state.memory / Number(state.display)).toString() }
        break;

      case "multiply":
        state = { ...state, display: (state.memory * Number(state.display)).toString() }
        break;

      case "subtract":
        state = { ...state, display: (state.memory - Number(state.display)).toString() }
        break;

      case "add":
        state = { ...state, display: (state.memory + Number(state.display)).toString() }
        break;

      default:
        break;
    }
  } else if (state.lastInput) {
    switch (state.operation) {
      case "divide":
        state = { ...state, display: (state.memory / state.lastInput).toString() }
        break;

      case "multiply":
        state = { ...state, display: (state.memory * state.lastInput).toString() }
        break;

      case "subtract":
        state = { ...state, display: (state.memory - state.lastInput).toString() }
        break;

      case "add":
        state = { ...state, display: (state.memory + state.lastInput).toString() }
        break;

      default:
        break;
    }

	}
  state.memory = Number(state.display)
  refreshDisplay()
  state.display = null
}



// getting buttons
const button_1 = document.querySelector<HTMLButtonElement>(".calculator__button--button-1")
const button_2 = document.querySelector<HTMLButtonElement>(".calculator__button--button-2")
const button_3 = document.querySelector<HTMLButtonElement>(".calculator__button--button-3")
const button_4 = document.querySelector<HTMLButtonElement>(".calculator__button--button-4")
const button_5 = document.querySelector<HTMLButtonElement>(".calculator__button--button-5")
const button_6 = document.querySelector<HTMLButtonElement>(".calculator__button--button-6")
const button_7 = document.querySelector<HTMLButtonElement>(".calculator__button--button-7")
const button_8 = document.querySelector<HTMLButtonElement>(".calculator__button--button-8")
const button_9 = document.querySelector<HTMLButtonElement>(".calculator__button--button-9")
const button_0 = document.querySelector<HTMLButtonElement>(".calculator__button--button-0")
const button_period = document.querySelector<HTMLButtonElement>(".calculator__button--button-period")
const button_add = document.querySelector<HTMLButtonElement>(".calculator__button--button-add")
const button_subtract = document.querySelector<HTMLButtonElement>(".calculator__button--button-subtract")
const button_multiply = document.querySelector<HTMLButtonElement>(".calculator__button--button-multiply")
const button_divide = document.querySelector<HTMLButtonElement>(".calculator__button--button-divide")
const button_clear = document.querySelector<HTMLButtonElement>(".calculator__button--button-clear")
const button_backspace = document.querySelector<HTMLButtonElement>(".calculator__button--button-backspace")
const button_evaluate = document.querySelector<HTMLButtonElement>(".calculator__button--button-evaluate")
const button_debug = document.querySelector<HTMLButtonElement>(".calculator__button--button-debug")

// validate buttons exist
if (!button_1 || !button_2 || !button_3 || !button_4 || !button_5
  || !button_6 || !button_7 || !button_8 || !button_9 || !button_0) {
  throw new Error("Oopsie, a number button wasn't found")
}

if (!button_period || !button_add || !button_subtract || !button_multiply
  || !button_divide || !button_clear || !button_backspace || !button_evaluate) {
  throw new Error("Oopsie, an operator button wasn't found")
}

// add event listeners
button_1.addEventListener("click", () => addChar("1"))
button_2.addEventListener("click", () => { addChar("2") })
button_3.addEventListener("click", () => { addChar("3") })
button_4.addEventListener("click", () => { addChar("4") })
button_5.addEventListener("click", () => { addChar("5") })
button_6.addEventListener("click", () => { addChar("6") })
button_7.addEventListener("click", () => { addChar("7") })
button_8.addEventListener("click", () => { addChar("8") })
button_9.addEventListener("click", () => { addChar("9") })
button_0.addEventListener("click", () => { addChar("0") })
button_add.addEventListener("click", () => { addOperator("add") })
button_subtract.addEventListener("click", () => { addOperator("subtract") })
button_multiply.addEventListener("click", () => { addOperator("multiply") })
button_divide.addEventListener("click", () => { addOperator("divide") })
button_period.addEventListener("click", () => { addChar(".") })
button_clear.addEventListener("click", clear)
button_backspace.addEventListener("click", backspace)
button_evaluate.addEventListener("click", evaluate)
button_debug?.addEventListener("click", () => { console.log(state) })

refreshDisplay()
