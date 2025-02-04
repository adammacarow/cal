let display = document.getElementById('display');
let calculation = '';

function addToDisplay(value) {
    // Prevent multiple decimal points in a number
    if (value === '.' && display.value.includes('.')) return;
    
    // Prevent multiple operators in sequence
    if (['+', '-', '*', '/', '%'].includes(value)) {
        let lastChar = display.value.slice(-1);
        if (['+', '-', '*', '/', '%'].includes(lastChar)) {
            display.value = display.value.slice(0, -1) + value;
            return;
        }
    }
    
    display.value += value;
}

function clearDisplay() {
    display.value = '';
    calculation = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Handle percentage calculations
        let expression = display.value.replace(/%/g, '/100');
        
        // Evaluate the expression
        let result = eval(expression);
        
        // Format the result
        if (Number.isInteger(result)) {
            display.value = result;
        } else {
            display.value = parseFloat(result.toFixed(8));
        }
    } catch (error) {
        display.value = 'Error';
        setTimeout(clearDisplay, 1000);
    }
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9' || key === '.' || 
        key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        addToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});