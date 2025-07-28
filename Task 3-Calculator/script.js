// Scientific Calculator - Main JavaScript File
class ScientificCalculator {
    constructor() {
        this.currentExpression = '0';
        this.currentResult = '0';
        this.memory = 0;
        this.isNewCalculation = true;
        this.parenthesesCount = 0;
        this.lastOperation = '';
        this.waitingForOperand = false;
        
        // DOM Elements
        this.expressionElement = document.getElementById('expression');
        this.resultElement = document.getElementById('result');
        this.memoryIndicator = document.getElementById('memoryIndicator');
        
        this.initializeCalculator();
        this.setupEventListeners();
    }

    initializeCalculator() {
        this.updateDisplay();
        this.updateMemoryIndicator();
    }

    setupEventListeners() {
        // Button click events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn')) {
                this.handleButtonClick(e.target);
            }
        });

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardInput(e);
        });


    }

    handleButtonClick(button) {
        const action = button.dataset.action;
        const value = button.dataset.value;

        // Add ripple effect
        this.createRippleEffect(button);

        if (value) {
            this.appendNumber(value);
        } else if (action) {
            this.handleAction(action);
        }
    }

    handleKeyboardInput(event) {
        const key = event.key.toLowerCase();
        
        // Prevent default for calculator keys
        if (this.isCalculatorKey(key)) {
            event.preventDefault();
        }

        // Number keys
        if (/^[0-9]$/.test(key)) {
            this.appendNumber(key);
        }
        // Decimal point
        else if (key === '.' || key === ',') {
            this.appendDecimal();
        }
        // Operators
        else if (['+', '-', '*', '/'].includes(key)) {
            this.handleOperator(key);
        }
        // Enter or equals
        else if (key === 'enter' || key === '=') {
            this.calculate();
        }
        // Clear
        else if (key === 'escape') {
            this.clearAll();
        }
        // Backspace
        else if (key === 'backspace') {
            this.backspace();
        }
        // Scientific functions
        else if (['s', 'c', 't', 'l'].includes(key)) {
            this.handleScientificFunction(key);
        }
        // Parentheses
        else if (key === '(' || key === ')') {
            this.handleParentheses(key);
        }
    }

    isCalculatorKey(key) {
        const calculatorKeys = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '.', ',', '+', '-', '*', '/', '=', 'enter', 'escape',
            'backspace', 's', 'c', 't', 'l', '(', ')'
        ];
        return calculatorKeys.includes(key);
    }

    handleScientificFunction(key) {
        const functionMap = {
            's': 'sin',
            'c': 'cos', 
            't': 'tan',
            'l': 'log',
            'a': 'asin',
            'o': 'cos',
            'n': 'tan',
            'g': 'log'
        };
        
        if (functionMap[key]) {
            this.applyFunction(functionMap[key]);
        }
    }

    createRippleEffect(button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    appendNumber(number) {
        if (this.isNewCalculation) {
            this.currentExpression = number;
            this.isNewCalculation = false;
        } else {
            if (this.currentExpression === '0') {
                this.currentExpression = number;
            } else {
                this.currentExpression += number;
            }
        }
        this.waitingForOperand = false;
        this.updateDisplay();
        this.calculateRealTime();
    }

    appendDecimal() {
        if (this.isNewCalculation) {
            this.currentExpression = '0.';
            this.isNewCalculation = false;
        } else if (!this.currentExpression.includes('.')) {
            this.currentExpression += '.';
        }
        this.waitingForOperand = false;
        this.updateDisplay();
    }

    handleAction(action) {
        switch (action) {
            case 'ac':
                this.clearAll();
                break;
            case 'c':
                this.clear();
                break;
            case 'backspace':
                this.backspace();
                break;
            case 'add':
                this.handleOperator('+');
                break;
            case 'subtract':
                this.handleOperator('-');
                break;
            case 'multiply':
                this.handleOperator('*');
                break;
            case 'divide':
                this.handleOperator('/');
                break;
            case 'equals':
                this.calculate();
                break;
            case 'decimal':
                this.appendDecimal();
                break;
            case 'parentheses':
                this.toggleParentheses();
                break;
            // Scientific functions
            case 'sin':
            case 'cos':
            case 'tan':
            case 'asin':
            case 'acos':
            case 'atan':
            case 'log':
            case 'ln':
            case 'sqrt':
            case 'power':
            case 'factorial':
            case 'abs':
            case 'floor':
            case 'ceil':
            case 'round':
            case 'exp':
            case 'sinh':
            case 'cosh':
            case 'tanh':
                this.applyFunction(action);
                break;
            case 'pi':
                this.appendConstant('π');
                break;
            case 'e':
                this.appendConstant('e');
                break;
            case 'mod':
                this.handleOperator('%');
                break;
            // Memory functions
            case 'mc':
                this.memoryClear();
                break;
            case 'mr':
                this.memoryRecall();
                break;
            case 'm-plus':
                this.memoryAdd();
                break;
            case 'm-minus':
                this.memorySubtract();
                break;
        }
    }

    handleOperator(operator) {
        if (!this.waitingForOperand) {
            this.currentExpression += ` ${operator} `;
            this.waitingForOperand = true;
            this.lastOperation = operator;
        } else {
            // Replace the last operator
            this.currentExpression = this.currentExpression.slice(0, -3) + ` ${operator} `;
        }
        this.updateDisplay();
    }

    applyFunction(func) {
        const value = this.getCurrentValue();
        let result;

        try {
            switch (func) {
                case 'sin':
                    result = Math.sin(this.toRadians(value));
                    break;
                case 'cos':
                    result = Math.cos(this.toRadians(value));
                    break;
                case 'tan':
                    result = Math.tan(this.toRadians(value));
                    break;
                case 'asin':
                    result = this.toDegrees(Math.asin(value));
                    break;
                case 'acos':
                    result = this.toDegrees(Math.acos(value));
                    break;
                case 'atan':
                    result = this.toDegrees(Math.atan(value));
                    break;
                case 'log':
                    result = Math.log10(value);
                    break;
                case 'ln':
                    result = Math.log(value);
                    break;
                case 'sqrt':
                    result = Math.sqrt(value);
                    break;
                case 'power':
                    result = Math.pow(value, 2);
                    break;
                case 'factorial':
                    result = this.factorial(value);
                    break;
                case 'abs':
                    result = Math.abs(value);
                    break;
                case 'floor':
                    result = Math.floor(value);
                    break;
                case 'ceil':
                    result = Math.ceil(value);
                    break;
                case 'round':
                    result = Math.round(value);
                    break;
                case 'exp':
                    result = Math.exp(value);
                    break;
                case 'sinh':
                    result = Math.sinh(value);
                    break;
                case 'cosh':
                    result = Math.cosh(value);
                    break;
                case 'tanh':
                    result = Math.tanh(value);
                    break;
            }

            if (isFinite(result)) {
                this.currentExpression = this.formatNumber(result);
                this.isNewCalculation = true;
                this.updateDisplay();
                this.calculateRealTime();
            } else {
                this.showError('Invalid input for function');
            }
        } catch (error) {
            this.showError('Function error');
        }
    }

    appendConstant(constant) {
        let value;
        switch (constant) {
            case 'π':
                value = Math.PI;
                break;
            case 'e':
                value = Math.E;
                break;
        }

        if (this.isNewCalculation) {
            this.currentExpression = this.formatNumber(value);
            this.isNewCalculation = false;
        } else {
            this.currentExpression += this.formatNumber(value);
        }
        this.updateDisplay();
        this.calculateRealTime();
    }

    toggleParentheses() {
        if (this.parenthesesCount === 0 || this.currentExpression.endsWith('(')) {
            this.currentExpression += '(';
            this.parenthesesCount++;
        } else {
            this.currentExpression += ')';
            this.parenthesesCount--;
        }
        this.updateDisplay();
    }

    handleParentheses(parenthesis) {
        if (parenthesis === '(') {
            this.currentExpression += '(';
            this.parenthesesCount++;
        } else if (parenthesis === ')' && this.parenthesesCount > 0) {
            this.currentExpression += ')';
            this.parenthesesCount--;
        }
        this.updateDisplay();
    }

    calculate() {
        try {
            // Close any open parentheses
            while (this.parenthesesCount > 0) {
                this.currentExpression += ')';
                this.parenthesesCount--;
            }

            const sanitizedExpression = this.sanitizeExpression(this.currentExpression);
            const result = this.evaluateExpression(sanitizedExpression);

            if (isFinite(result)) {
                this.currentResult = this.formatNumber(result);
                this.currentExpression = this.currentResult;
                this.isNewCalculation = true;
                this.showSuccess();
            } else {
                this.showError('Invalid calculation');
            }
        } catch (error) {
            this.showError('Calculation error');
        }
        this.updateDisplay();
    }

    calculateRealTime() {
        try {
            const sanitizedExpression = this.sanitizeExpression(this.currentExpression);
            const result = this.evaluateExpression(sanitizedExpression);

            if (isFinite(result)) {
                this.currentResult = this.formatNumber(result);
            } else {
                this.currentResult = 'Error';
            }
        } catch (error) {
            this.currentResult = 'Error';
        }
        this.updateDisplay();
    }

    sanitizeExpression(expression) {
        return expression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-')
            .replace(/π/g, Math.PI)
            .replace(/\be\b/g, Math.E)
            .replace(/\s+/g, '')
            .trim();
    }

    evaluateExpression(expression) {
        // Replace scientific functions with their JavaScript equivalents
        expression = expression
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/abs\(/g, 'Math.abs(');

        // Use Function constructor for safe evaluation
        return new Function('return ' + expression)();
    }

    getCurrentValue() {
        const parts = this.currentExpression.split(/[\+\-\*\/]/);
        const lastPart = parts[parts.length - 1].trim();
        return parseFloat(lastPart) || 0;
    }

    clearAll() {
        this.currentExpression = '0';
        this.currentResult = '0';
        this.isNewCalculation = true;
        this.parenthesesCount = 0;
        this.waitingForOperand = false;
        this.updateDisplay();
    }

    clear() {
        this.currentExpression = '0';
        this.isNewCalculation = true;
        this.updateDisplay();
    }

    backspace() {
        if (this.currentExpression.length === 1) {
            this.currentExpression = '0';
            this.isNewCalculation = true;
        } else {
            this.currentExpression = this.currentExpression.slice(0, -1);
        }
        this.updateDisplay();
        this.calculateRealTime();
    }

    // Memory Functions
    memoryClear() {
        this.memory = 0;
        this.updateMemoryIndicator();
        this.showSuccess('Memory cleared');
    }

    memoryRecall() {
        if (this.memory !== 0) {
            this.currentExpression = this.formatNumber(this.memory);
            this.isNewCalculation = true;
            this.updateDisplay();
            this.calculateRealTime();
        }
    }

    memoryAdd() {
        const value = parseFloat(this.currentResult) || 0;
        this.memory += value;
        this.updateMemoryIndicator();
        this.showSuccess('Added to memory');
    }

    memorySubtract() {
        const value = parseFloat(this.currentResult) || 0;
        this.memory -= value;
        this.updateMemoryIndicator();
        this.showSuccess('Subtracted from memory');
    }

    updateMemoryIndicator() {
        if (this.memory !== 0) {
            this.memoryIndicator.classList.add('active');
        } else {
            this.memoryIndicator.classList.remove('active');
        }
    }

    // Utility Functions
    formatNumber(num) {
        if (Number.isInteger(num)) {
            return num.toString();
        }
        return parseFloat(num.toFixed(10)).toString();
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    toDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    factorial(n) {
        if (n < 0 || !Number.isInteger(n)) {
            throw new Error('Factorial only works with non-negative integers');
        }
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    updateDisplay() {
        this.expressionElement.textContent = this.currentExpression;
        this.resultElement.textContent = this.currentResult;
    }

    showError(message) {
        this.resultElement.textContent = 'Error';
        this.resultElement.classList.add('error');
        setTimeout(() => {
            this.resultElement.classList.remove('error');
        }, 1000);
    }

    showSuccess(message = '') {
        this.resultElement.classList.add('success');
        setTimeout(() => {
            this.resultElement.classList.remove('success');
        }, 500);
    }


}

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScientificCalculator();
});

// Add some additional utility functions for enhanced functionality
window.CalculatorUtils = {
    // Convert between different angle units
    degreesToRadians: (degrees) => degrees * (Math.PI / 180),
    radiansToDegrees: (radians) => radians * (180 / Math.PI),
    
    // Additional mathematical constants
    constants: {
        PI: Math.PI,
        E: Math.E,
        PHI: 1.618033988749895, // Golden ratio
        SQRT2: Math.SQRT2,
        SQRT1_2: Math.SQRT1_2
    },
    
    // Additional mathematical functions
    functions: {
        // Inverse trigonometric functions
        asin: (x) => Math.asin(x) * (180 / Math.PI),
        acos: (x) => Math.acos(x) * (180 / Math.PI),
        atan: (x) => Math.atan(x) * (180 / Math.PI),
        
        // Hyperbolic functions
        sinh: (x) => Math.sinh(x),
        cosh: (x) => Math.cosh(x),
        tanh: (x) => Math.tanh(x),
        
        // Additional functions
        floor: (x) => Math.floor(x),
        ceil: (x) => Math.ceil(x),
        round: (x) => Math.round(x),
        random: () => Math.random()
    }
}; 