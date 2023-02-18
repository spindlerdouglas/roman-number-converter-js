const ROMAN_CHARACTERS = ['I', 'V', 'X', 'L', 'C', 'D', 'M', 'B', 'E', 'F', 'G', 'H']

const romanNumbers = [
    { char: ROMAN_CHARACTERS[0], number: 1, magnitude: 0 },
    { char: ROMAN_CHARACTERS[1], number: 5, magnitude: 0 },
    { char: ROMAN_CHARACTERS[2], number: 1, magnitude: 1 },
    { char: ROMAN_CHARACTERS[3], number: 5, magnitude: 1 },
    { char: ROMAN_CHARACTERS[4], number: 1, magnitude: 2 },
    { char: ROMAN_CHARACTERS[5], number: 5, magnitude: 2 },
    { char: ROMAN_CHARACTERS[6], number: 1, magnitude: 3 },
    { char: ROMAN_CHARACTERS[7], number: 5, magnitude: 3 },     // for testing only
    { char: ROMAN_CHARACTERS[8], number: 1, magnitude: 4 },     // for testing only
    { char: ROMAN_CHARACTERS[9], number: 5, magnitude: 4 },     // for testing only
    { char: ROMAN_CHARACTERS[10], number: 1, magnitude: 5 },    // for testing only
    { char: ROMAN_CHARACTERS[11], number: 5, magnitude: 5 },    // for testing only
]

const getArabicNumberByChar = (char) => {
    const romanNumber = getRomanNumberByChar(char)
    return romanNumber.number * (10 ** romanNumber.magnitude)
}

const getRomanNumberByChar = (char) => {
    return romanNumbers.find(element => element.char === char)
}
const getRomanNumberByDigitAndMagnitude = (digit, magnitude) => {
    const numbers = romanNumbers.filter(element => element.number <= digit 
                                                && element.magnitude === magnitude)
    const romanNumber = numbers[numbers.length-1]
    return romanNumber.char
}

const isInvalidRepetition = (currentNumber, previousNumber) => {
    return (currentNumber.char === previousNumber.char && previousNumber.number === 5)
}

const isInvalidSequence = (currentNumber, previousNumber) => {
    return (previousNumber.magnitude < currentNumber.magnitude
        && (previousNumber.number === 5 || (previousNumber.number === 1 && currentNumber.number === 5))
        || ((currentNumber.magnitude - previousNumber.magnitude) > 1))
}

const exceedsValidOccurrences = (number, occurrences) => {
    return number.number === 1 && occurrences > 3
}

const validate = (char, currentNumber, previousNumber, occurrences) => {
    if (currentNumber === undefined || currentNumber === null || !ROMAN_CHARACTERS.includes(currentNumber.char))
        throw new Error(`${char} is not a valid roman character`)

    if (exceedsValidOccurrences(currentNumber, occurrences))
        throw new Error(`${currentNumber.char} cannot appear more than three times`)

    if (previousNumber != null) {
        if (isInvalidRepetition(currentNumber, previousNumber))
            throw new Error(`${currentNumber.char} cannot be repeated`)
    
        if (isInvalidSequence(currentNumber, previousNumber))
            throw new Error(`${previousNumber.char} cannot appear before ${currentNumber.char}`)
    }
}

const validateInput = (input) => {
    let previousNumber = null
    let numOccurrences = 0
    for (let index = 0; index < input.length; index++) {
        const currentChar = input.charAt(index) 
        const currentNumber = getRomanNumberByChar(currentChar)

        numOccurrences = (previousNumber != null && previousNumber.char === currentNumber.char)
            ? numOccurrences + 1
            : 1

        validate(currentChar, currentNumber, previousNumber, numOccurrences)
        previousNumber = currentNumber
    }
}

const shouldSubtract = (currentNumber, previousNumber) => {
    return ((previousNumber.number === 1 
        && (previousNumber.magnitude === (currentNumber.magnitude - 1))
        || (previousNumber.magnitude === currentNumber.magnitude && currentNumber.number === 5)))
}

export function convertToArabicNumber(input) {
    let previousNumber = null;
    let result = 0;
    validateInput(input);
    for (let index = 0; index < input.length; index++) {
        const currentChar = input.charAt(index);
        const currentNumber = getRomanNumberByChar(currentChar);
        const arabicNumber = getArabicNumberByChar(currentChar);
    
        result += (previousNumber != null && shouldSubtract(currentNumber, previousNumber))
            ? (arabicNumber - (2 * (10 ** previousNumber.magnitude)))   // 1 + 10 - 2 = 9
            : arabicNumber                                              // 10 + 50 - 20 = 40

        previousNumber = currentNumber;
    }
    return result;
}

const fillSequence = (digit, magnitude) => {
    let result = ''
    for (let index = 0; index < digit; index++) {
        const currentRomanDigit = getRomanNumberByDigitAndMagnitude(1, magnitude)
        result = result.concat(currentRomanDigit)
    }
    return result
}

export function convertToRomanNumber(input) {
    const inputString = input.toString()
    let magnitude = inputString.length - 1;
    let result = ''
    for (let index = 0; index < inputString.length; index++) {
        const currentDigit = inputString[index];
        if (currentDigit != 0) {
            result = (currentDigit == 4 || currentDigit == 9)
                ? result.concat(getRomanNumberByDigitAndMagnitude(1, magnitude)).concat(getNextRomanDigit(currentDigit, magnitude))
                : (currentDigit > 1 && currentDigit < 5)
                ? result.concat(fillSequence(currentDigit, magnitude))
                : (currentDigit > 5 && currentDigit < 9)
                ? result.concat(getRomanNumberByDigitAndMagnitude(5, magnitude)).concat(fillSequence((currentDigit - 5), magnitude))
                : result.concat(getRomanNumberByDigitAndMagnitude(currentDigit, magnitude))
        }
        magnitude--
    }
    return result
}


function getNextRomanDigit(currentDigit, magnitude) {
    const nextDigit = (currentDigit == 4) ? 5 : 1
    const nextDigitMagnitude = (currentDigit == 9) ? magnitude + 1 : magnitude
    const nextRomanDigit = getRomanNumberByDigitAndMagnitude(nextDigit, nextDigitMagnitude)
    return nextRomanDigit
}
//import readline  from "readline";
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// rl.question("Roman number: ", (input) => {
//     console.log(`Converted number: ${convertToArabicNumber(input)}`)
//     rl.close()
// });
