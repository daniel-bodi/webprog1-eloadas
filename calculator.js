class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = null;
        this.operator = null;
        this.resultDisplayed = false;
    }

    // Frissíti a kijelzőt
    updateDisplay(displayElement) {
        displayElement.innerText = this.currentValue;
    }

    // Gombkattintás kezelése
    handleButtonClick(value) {
        if (this.resultDisplayed) {
            this.currentValue = value;
            this.resultDisplayed = false;
        } else {

            if (this.currentValue === '0' && value !== '.') {
                this.currentValue = value;
            } else {
                this.currentValue += value;
            }
        }
    }

    // Operátor gombok kezelése
    handleOperator(operator) {
        if (this.previousValue === null) {
            this.previousValue = this.currentValue;
            this.operator = operator;
            this.currentValue = '';
        } else {
            this.calculate();
            this.operator = operator;
            this.previousValue = this.currentValue;
            this.currentValue = '';
        }
    }

    calculate() {
        if (this.operator && this.previousValue !== null) {
            const num1 = parseFloat(this.previousValue);
            const num2 = parseFloat(this.currentValue);

            switch (this.operator) {
                case '+':
                    this.currentValue = (num1 + num2).toString();
                    break;
                case '-':
                    this.currentValue = (num1 - num2).toString();
                    break;
                case '*':
                    this.currentValue = (num1 * num2).toString();
                    break;
                case '/':
                    if (num2 === 0) {
                        this.currentValue = 'ERROR';
                    } else {
                        this.currentValue = (num1 / num2).toString();
                    }
                    break;
            }

            this.previousValue = null;
            this.operator = null;
            this.resultDisplayed = true;
        }
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = null;
        this.operator = null;
        this.resultDisplayed = false;
    }
}

const calculator = new Calculator();
const displayElement = document.getElementById('display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const value = event.target.innerText;

        if (['+', '-', '*', '/'].includes(value)) {
            calculator.handleOperator(value);
        } else if (value === '=') {
            calculator.calculate();
        } else if (value === 'C') {  // Törlés
            calculator.clear();
        } else {
            calculator.handleButtonClick(value);
        }

        calculator.updateDisplay(displayElement);
    });
});
