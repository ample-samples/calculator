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
type Operator = "add" | "subtract" | "multiply" | "divide" | "power" | null

type State = {
  display: string | null;
  operation: Operator;
  memory: number | null;
  lastInput: number | null;
  theme: "dark" | "light" | "disco" | null
}

const displayEl = document.querySelector<HTMLElement>('#display')
if (!displayEl) throw new Error("Oopsie, display element not found")

// init state
let state: State = { display: null, operation: null, memory: null, lastInput: null, theme: "light" }

const refreshDisplay = () => {
  if (!state.display) {
    displayEl.innerText = "0"
  } else {
    displayEl.innerText = state.display
  }
}

const clear = () => {
  console.log("clearing")
  state.display = null
  state.memory = null
  state.operation = null
  refreshDisplay()
}

const addChar = (char: string) => {
  if (/[0-9]|\./.test(char)) {
    const currentDisplay = state.display
    if (currentDisplay) {
      state = { ...state, display: currentDisplay + char }
    } else {
      state = { ...state, display: char }
    }
    state.lastInput = Number(state.display)
  } else {
    if (char === "π") {
      state = { ...state, display: Math.PI.toString() }
    }
  }
  refreshDisplay()
}

const backspace = () => {
  console.log("backspace")
  if (state.display === null || state.display.length === 1) {
    state.display = null
  } else {
    state = { ...state, display: state.display.substring(0, state.display.length - 1) }
  }
  refreshDisplay()
}

const addOperator = (operator: Operator) => {
  let { operation, display, memory, lastInput } = state
  operation = operator
  memory = Number(state.display ?? state.memory)
  lastInput = Number(state.display ?? state.lastInput)
  display = null
  state = { ...state, operation, display, memory, lastInput }
}

const evaluate = () => {
  if (!state.memory) return;

  const firstNumber: number = state.memory;
  let secondNumber: number;
  if (state.display !== null) {
    secondNumber = Number(state.display)
  } else if (state.lastInput !== null) {
    secondNumber = state.lastInput
  } else {
    return
  }

  switch (state.operation) {
    case "divide":
      state = { ...state, display: (firstNumber / secondNumber).toString() }
      break;

    case "multiply":
      state = { ...state, display: (firstNumber * secondNumber).toString() }
      break;

    case "subtract":
      state = { ...state, display: (firstNumber - secondNumber).toString() }
      break;

    case "add":
      state = { ...state, display: (firstNumber + secondNumber).toString() }
      break;

    case "power":
      state = { ...state, display: (firstNumber ** secondNumber).toString() }
      break;

    default:
      throw new Error("Operation not supported")
  }

  state.memory = Number(state.display)
  refreshDisplay()
  state.display = null
}

const calculator = document.querySelector<HTMLDivElement>(".calculator")
if (!calculator) throw new Error("Calculator not found")
const audio = document.querySelector<HTMLAudioElement>("audio");
if (!audio) throw new Error("Audio not found")
const discoBall = document.querySelector<HTMLImageElement>("#disco-ball")
if (!discoBall) throw new Error("Groove not found")

const changeTheme = (theme: string) => {
  switch (theme) {
    case "dark":
      state = { ...state, theme: "dark" }
        calculator.classList.remove("theme-disco")
        calculator.classList.remove("theme-light")
        calculator.classList.add("theme-dark")
      discoBall.style.display = "none"
      audio.pause()
      break;
    case "disco":
      state = { ...state, theme: "disco" }
        calculator.classList.add("theme-disco")
        calculator.classList.remove("theme-light")
        calculator.classList.remove("theme-dark")
      discoBall.style.display = "block"
      audio.currentTime = 0
        audio.play()
      break;
    case "light":
      state = { ...state, theme: "light" }
        calculator.classList.remove("theme-disco")
        calculator.classList.add("theme-light")
        calculator.classList.remove("theme-dark")
      discoBall.style.display = "none"
      audio.pause()
      break;

    default:
      break;
  }
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
const button_power = document.querySelector<HTMLButtonElement>(".calculator__button--button-power")
const button_clear = document.querySelector<HTMLButtonElement>(".calculator__button--button-clear")
const button_backspace = document.querySelector<HTMLButtonElement>(".calculator__button--button-backspace")
const button_evaluate = document.querySelector<HTMLButtonElement>(".calculator__button--button-evaluate")
const button_pi = document.querySelector<HTMLButtonElement>(".calculator__button--button-pi")
const button_theme1 = document.querySelector<HTMLButtonElement>(".calculator__button--button-theme1")
const button_theme2 = document.querySelector<HTMLButtonElement>(".calculator__button--button-theme2")
const button_theme3 = document.querySelector<HTMLButtonElement>(".calculator__button--button-theme3")


if (!button_1 || !button_2 || !button_3 || !button_4 || !button_5
  || !button_6 || !button_7 || !button_8 || !button_9 || !button_0
  || !button_pi) {
  throw new Error("Oopsie, a number button wasn't found")
}

if (!button_period || !button_add || !button_subtract || !button_multiply
  || !button_divide || !button_power || !button_clear || !button_backspace
  || !button_evaluate || !button_theme1 || !button_theme2 || !button_theme3) {
  throw new Error("Oopsie, an operator button wasn't found")
}

// add event listeners
button_1.addEventListener("click", () => { addChar("1") })
button_2.addEventListener("click", () => { addChar("2") })
button_3.addEventListener("click", () => { addChar("3") })
button_4.addEventListener("click", () => { addChar("4") })
button_5.addEventListener("click", () => { addChar("5") })
button_6.addEventListener("click", () => { addChar("6") })
button_7.addEventListener("click", () => { addChar("7") })
button_8.addEventListener("click", () => { addChar("8") })
button_9.addEventListener("click", () => { addChar("9") })
button_0.addEventListener("click", () => { addChar("0") })
button_period.addEventListener("click", () => { addChar(".") })
button_pi.addEventListener("click", () => { addChar("π") })
button_add.addEventListener("click", () => { addOperator("add") })
button_subtract.addEventListener("click", () => { addOperator("subtract") })
button_multiply.addEventListener("click", () => { addOperator("multiply") })
button_divide.addEventListener("click", () => { addOperator("divide") })
button_power.addEventListener("click", () => { addOperator("power") })
button_theme1.addEventListener("click", () => { changeTheme("light") })
button_theme2.addEventListener("click", () => { changeTheme("dark") })
button_theme3.addEventListener("click", () => { changeTheme("disco") })
button_clear.addEventListener("click", clear)
button_backspace.addEventListener("click", backspace)
button_evaluate.addEventListener("click", evaluate)

refreshDisplay()
