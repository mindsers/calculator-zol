const s = document.querySelector('.screen')

let previousNumber = []
let currentNumber = []
let sign = null
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.dataset.meaning === 'decimal' || !Number.isNaN(Number(button.dataset.meaning))) {
            currentNumber = writeNumber(currentNumber, button.dataset.meaning)
        }

        if (button.dataset.meaning === 'reset') {
            previousNumber = reset()
            currentNumber = reset()
        }

        if (['substract', 'multiply', 'add', 'divide'].includes(button.dataset.meaning)) {
            
            if (previousNumber.length > 0 && currentNumber.length > 0) {
                previousNumber = [...calculate(sign, previousNumber, currentNumber)]
            } else {
                previousNumber = [...currentNumber]
                
            }
            currentNumber = reset()
            sign = button.dataset.meaning
        }

        if (button.dataset.meaning === 'result') {
            if (currentNumber.join('') === '1337') {
                const video = document.createElement('video')
                const source = document.createElement('source')

                source.src = './video.mp4'
                source.type = 'video/mp4'

                video.autoplay = true

                video.appendChild(source)

                document.querySelector('body').appendChild(video)

                setTimeout(() => {
                    video.remove()
                }, 5000)
            }

            previousNumber = calculate(sign, previousNumber, currentNumber)
            currentNumber = reset()
            sign = null
        }
        
        console.log(previousNumber, currentNumber, sign)
        s.innerHTML = currentNumber.join('') || previousNumber.join('') || '0'
    })
})

function writeNumber(previousNumber, meaning) {
    const temp = [...previousNumber, meaning === 'decimal' ? '.' : meaning]
    const n = Number(temp.join(''))
    
    if (Number.isNaN(n)) {
        return previousNumber
    }

    return temp
}

function reset() {
    return []
}

function calculate(sign = null, previousNumber, currentNumber) {
    switch(sign) {
        case 'divide':
            return divide(previousNumber, currentNumber)
        case 'multiply':
            return multiply(previousNumber, currentNumber)
        case 'substract':
            return substract(previousNumber, currentNumber)
        case 'add':
            // Fallback
        default:
            return add(previousNumber, currentNumber)
    }
}

function add(previousNumber = [], currentNumber = []) {
    const result = Number(previousNumber.join('')) + Number(currentNumber.join(''))
    return Array.from(String(result))
}

function multiply(previousNumber = [], currentNumber = []) {
    const result = Number(previousNumber.join('')) * Number(currentNumber.join(''))
    return Array.from(String(result))
}

function substract(previousNumber = [], currentNumber = []) {
    const result = Number(previousNumber.join('')) - Number(currentNumber.join(''))
    return Array.from(String(result))
}

function divide(previousNumber = [], currentNumber = []) {
    const result = Number(previousNumber.join('')) / Number(currentNumber.join(''))
    return Array.from(String(result))
}