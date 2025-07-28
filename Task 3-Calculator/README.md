# Advanced Scientific Calculator

A fully responsive and interactive **Advanced Scientific Calculator** web application built with pure HTML, CSS, and Vanilla JavaScript. Features a modern glassmorphic design with smooth animations and comprehensive scientific functionality in a horizontal layout.

## ✨ Features

### 🧮 Core Calculator Functions
- **Basic Operations**: Addition, subtraction, multiplication, division
- **Scientific Functions**: 
  - Trigonometric: sin, cos, tan, asin, acos, atan
  - Hyperbolic: sinh, cosh, tanh
  - Logarithmic: log (base 10), ln (natural log)
  - Power & Root: square root, power (xʸ), factorial
  - Constants: π (pi), e (Euler's number)
  - Additional: absolute value, modulo, floor, ceil, round, exp

### 🎨 Modern UI/UX
- **Horizontal Layout**: Display and buttons side by side for better usability
- **Glassmorphic Design**: Beautiful frosted glass effect with backdrop blur
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Responsive Layout**: Perfect scaling across all devices
- **Smooth Animations**: Button hover effects, ripple animations, and transitions
- **Real-time Calculation**: Instant result updates as you type

### ⌨️ Keyboard Support
- **Numbers**: 0-9 keys
- **Operators**: +, -, *, / keys
- **Functions**: s (sin), c (cos), t (tan), l (log)
- **Navigation**: Enter (=), Escape (AC), Backspace
- **Parentheses**: ( and ) keys

### 💾 Memory Functions
- **MC**: Memory Clear
- **MR**: Memory Recall
- **M+**: Memory Add
- **M-**: Memory Subtract
- Visual memory indicator when memory contains a value

### 🔧 Advanced Features
- **Parentheses Support**: Complex expressions with proper precedence
- **Error Handling**: Graceful error messages and validation
- **Real-time Evaluation**: Live calculation updates
- **Accessibility**: Keyboard navigation and focus states
- **High Contrast Mode**: Support for accessibility preferences

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No external dependencies required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start calculating!

### File Structure
```
scientific-calculator/
├── index.html          # Main HTML structure
├── styles.css          # Modern CSS with glassmorphic design
├── script.js           # Complete calculator functionality
└── README.md           # Project documentation
```

## 🎯 Usage Examples

### Basic Calculations
```
2 + 3 = 5
10 * 5 = 50
100 / 4 = 25
```

### Scientific Functions
```
sin(30) = 0.5
cos(60) = 0.5
log(100) = 2
sqrt(16) = 4
5! = 120
```

### Complex Expressions
```
(2 + 3) * 4 = 20
sin(45) + cos(45) = 1.414
log(100) * sqrt(16) = 8
```

### Memory Operations
```
1. Enter a number: 100
2. Press M+ to add to memory
3. Enter another number: 50
4. Press M- to subtract from memory
5. Press MR to recall memory value
6. Press MC to clear memory
```

## 🎨 Design Features

### Glassmorphic UI
- Frosted glass background with backdrop blur
- Subtle borders and shadows
- Semi-transparent elements
- Smooth color transitions

### Responsive Design
- **Desktop**: Full-featured layout with all buttons visible
- **Tablet**: Optimized spacing and touch targets
- **Mobile**: Compact layout with essential functions

### Theme System
- **Light Theme**: Clean, modern appearance
- **Dark Theme**: Easy on the eyes for low-light environments
- **Auto-detection**: Respects system color scheme preferences

### Animations
- Button hover effects with subtle scaling
- Ripple effect on button clicks
- Smooth transitions between states
- Loading and success animations

## 🔧 Technical Implementation

### Architecture
- **Class-based JavaScript**: Organized, maintainable code
- **Event-driven**: Responsive to both mouse and keyboard input
- **Modular Design**: Separated concerns for easy maintenance

### Key Technologies
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern features like Grid, Flexbox, and CSS Variables
- **Vanilla JavaScript**: No external dependencies
- **CSS Custom Properties**: Dynamic theming system

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎯 Performance Features

- **Real-time Calculation**: Instant feedback without delays
- **Optimized Rendering**: Efficient DOM updates
- **Memory Management**: Proper cleanup and resource management
- **Responsive Design**: Smooth performance across devices

## 🔒 Security

- **Safe Expression Evaluation**: Uses Function constructor with validation
- **Input Sanitization**: Prevents malicious code execution
- **Error Boundaries**: Graceful error handling

## 🚀 Future Enhancements

Potential features for future versions:
- [ ] Unit conversions (length, weight, temperature)
- [ ] Statistical functions (mean, median, standard deviation)
- [ ] Complex number support
- [ ] History of calculations
- [ ] Export/import calculation history
- [ ] Custom function definitions
- [ ] Multiple calculation modes (RPN, algebraic)

## 🤝 Contributing

This is a learning project, but contributions are welcome! Feel free to:
- Report bugs or issues
- Suggest new features
- Improve documentation
- Enhance the design

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by modern calculator designs
- Built with accessibility in mind
- Uses the Inter font family for optimal readability
- Implements modern web standards and best practices
- Created by Deepika Dubey

---

**Enjoy calculating! 🧮✨** 