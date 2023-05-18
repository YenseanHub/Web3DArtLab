export const unitRange = {
  'Unit from file': 'file',
  Meter: 'm',
  Milimeter: 'mm',
  Centimeter: 'cm',
  Feet: 'ft',
  Inch: 'in',
  Point: 'pt'
}

export const decimalPrecisionRange = {
  'Precision from file': 99,
  '0(1)': 0,
  '0.1(1/2)': 1,
  '0.01(1/4)': 2,
  '0.001(1/8)': 3,
  '0.0001(1/16)': 4,
  '0.00001(1/32)': 5,
  '0.000001(1/64)': 6
}

export const showPrecisionValue = (value, precistionType) => {
  const str = value.toFixed(
    precistionType === decimalPrecisionRange['Precision from file'] ? 2 : precistionType
  )
  return str
}
