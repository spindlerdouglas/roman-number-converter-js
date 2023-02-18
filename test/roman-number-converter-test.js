import assert from 'assert/strict'
import { convertToArabicNumber } from '../lib/app.js'
import { convertToRomanNumber } from '../lib/app.js'

describe('Convert to arabic number', () => {
    describe('Invalid numbers', () => {
        describe('Invalid characters', () => {
            it('Invalid character: A', () => {
                assert.equal(whenConversionRaisesError('A'), `A is not a valid roman character`)
            })
            it('Invalid character: Z', () => {
                assert.equal(whenConversionRaisesError('Z'), `Z is not a valid roman character`)
            })
            it('Invalid character: 6', () => {
                assert.equal(whenConversionRaisesError('6'), `6 is not a valid roman character`)
            })
            describe('Lowercase characters', () => {
                it('Invalid character: i', () => {
                    assert.equal(whenConversionRaisesError('i'), `i is not a valid roman character`)
                })
            })
        })
        describe('Invalid number of repetitions', () => {
            it('Invalid sequence: IIII', () => {
                assert.equal(whenConversionRaisesError('IIII'), `I cannot appear more than three times`)
            })
            it('Invalid sequence: XXXX', () => {
                assert.equal(whenConversionRaisesError('XXXX'), `X cannot appear more than three times`)
            })
            it('Invalid sequence: CCCC', () => {
                assert.equal(whenConversionRaisesError('CCCC'), `C cannot appear more than three times`)
            })
            it('Invalid sequence: MMMM', () => {
                assert.equal(whenConversionRaisesError('MMMM'), `M cannot appear more than three times`)
            })
            it('Invalid sequence: CCCLXXXXIII', () => {
                assert.equal(whenConversionRaisesError('CCCLXXXXIII'), `X cannot appear more than three times`)
            })
            it('Invalid sequence: MMMDCCCLXXXX', () => {
                assert.equal(whenConversionRaisesError('MMMDCCCLXXXX'), `X cannot appear more than three times`)
            })
        })
        describe('Invalid subtractions', () => {
            it('Invalid sequence: VX', () => {
                assert.equal(whenConversionRaisesError('VX'), `V cannot appear before X`)
            })
            it('Invalid sequence: LC', () => {
                assert.equal(whenConversionRaisesError('LC'), `L cannot appear before C`)
            })
            it('Invalid sequence: IL', () => {
                assert.equal(whenConversionRaisesError('IL'), `I cannot appear before L`)
            })
        }
        )
    })

    describe('Simple numbers', () => {
        it('I = 1', () => {
            assert.equal(convertToArabicNumber('I'), 1)
        })
        it('V = 5', () => {
            assert.equal(convertToArabicNumber('V'), 5)
        })
        it('X = 10', () => {
            assert.equal(convertToArabicNumber('X'), 10)
        })
        it('L = 50', () => {
            assert.equal(convertToArabicNumber('L'), 50)
        })
        it('C = 100', () => {
            assert.equal(convertToArabicNumber('C'), 100)
        })
        it('D = 500', () => {
            assert.equal(convertToArabicNumber('D'), 500)
        })
        it('M = 1000', () => {
            assert.equal(convertToArabicNumber('M'), 1000)
        })
    })

    describe('Simple additions', () => {
        it('VI = 6', () => {
            assert.equal(convertToArabicNumber('VI'), 6)
        })
        it('XV = 15', () => {
            assert.equal(convertToArabicNumber('XV'), 15)
        })
        it('LXX = 70', () => {
            assert.equal(convertToArabicNumber('LXX'), 70)
        })
        it('CCC = 300', () => {
            assert.equal(convertToArabicNumber('CCC'), 300)
        })
        it('MMD = 2500', () => {
            assert.equal(convertToArabicNumber('MMD'), 2500)
        })

    })

    describe('Complex additions', () => {
        it('XXXVIII = 38', () => {
            assert.equal(convertToArabicNumber('XXXVIII'), 38)
        })
        it('LXXXIII = 83', () => {
            assert.equal(convertToArabicNumber('LXXXIII'), 83)
        })
        it('CCCXXXIII = 333', () => {
            assert.equal(convertToArabicNumber('CCCXXXIII'), 333)
        })
        it('DCCCLXXVII = 877', () => {
            assert.equal(convertToArabicNumber('DCCCLXXVII'), 877)
        })
        it('MMMDCCLXII = 3762', () => {
            assert.equal(convertToArabicNumber('MMMDCCLXII'), 3762)
        })
    })

    describe('Simple subtractions', () => {
        it('IV = 4', () => {
            assert.equal(convertToArabicNumber('IV'), 4)
        })
        it('IX = 9', () => {
            assert.equal(convertToArabicNumber('IX'), 9)
        })
        it('XL = 40', () => {
            assert.equal(convertToArabicNumber('XL'), 40)
        })
        it('XC = 90', () => {
            assert.equal(convertToArabicNumber('XC'), 90)
        })
        it('CD = 400', () => {
            assert.equal(convertToArabicNumber('CD'), 400)
        })
        it('CM = 900', () => {
            assert.equal(convertToArabicNumber('CM'), 900)
        })

    })

    describe('Complex subtractions', () => {
        it('XLIV = 44', () => {
            assert.equal(convertToArabicNumber('XLIV'), 44)
        })
        it('XLIX = 49', () => {
            assert.equal(convertToArabicNumber('XLIX'), 49)
        })
        it('XCIV = 94', () => {
            assert.equal(convertToArabicNumber('XCIV'), 94)
        })
        it('XCIX = 99', () => {
            assert.equal(convertToArabicNumber('XCIX'), 99)
        })
        it('CDXLIV = 444', () => {
            assert.equal(convertToArabicNumber('CDXLIV'), 444)
        })
        it('CMXCIX = 999', () => {
            assert.equal(convertToArabicNumber('CMXCIX'), 999)
        })
    })
})

const whenConversionRaisesError = (input) => {
    try {
        convertToArabicNumber(input)
    } catch (error) {
        return error.message
    }
}


describe('Convert to roman number', () => {
    describe('test', () => {
        it('1000 -> M', () => {
            assert.equal(convertToRomanNumber(1000), 'M')
        })
        it('100 -> C', () => {
            assert.equal(convertToRomanNumber(100), 'C')
        })
        it('10 -> X', () => {
            assert.equal(convertToRomanNumber(10), 'X')
        })
        it('1 -> I', () => {
            assert.equal(convertToRomanNumber(1), 'I')
        })
        it('15 -> XV', () => {
            assert.equal(convertToRomanNumber(15), 'XV')
        })
        it('4 -> IV', () => {
            assert.equal(convertToRomanNumber(4), 'IV')
        })
        it('40 -> XL', () => {
            assert.equal(convertToRomanNumber(40), 'XL')
        })
        it('9 -> IX', () => {
            assert.equal(convertToRomanNumber(9), 'IX')
        })
        it('90 -> XC', () => {
            assert.equal(convertToRomanNumber(90), 'XC')
        })
        it('99 -> XCIX', () => {
            assert.equal(convertToRomanNumber(99), 'XCIX')
        })
        it('300 -> CCC', () => {
            assert.equal(convertToRomanNumber(300), 'CCC')
        })
        it('400 -> CD', () => {
            assert.equal(convertToRomanNumber(400), 'CD')
        })
        it('876 -> DCCCLXXVI', () => {
            assert.equal(convertToRomanNumber(876), 'DCCCLXXVI')
        })
        it('3444 -> MMMCDXLIV', () => {
            assert.equal(convertToRomanNumber(3444), 'MMMCDXLIV')
        })
        it('230 -> CCXXX', () => {
            assert.equal(convertToRomanNumber(230), 'CCXXX')
        })
        it('8999 -> BMMMCMXCIX', () => {
            assert.equal(convertToRomanNumber(8999), 'BMMMCMXCIX')
        })
        it('888999 -> HGGGFEEEBMMMCMXCIX', () => {
            assert.equal(convertToRomanNumber(888999), 'HGGGFEEEBMMMCMXCIX')
        })
    })
})
