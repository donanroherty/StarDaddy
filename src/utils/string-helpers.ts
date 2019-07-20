export const sanitizeString = (str: string) =>
  str.replace(/[^a-zA-Z0-9]/gi, ' ')

export const stringToArray = (str: string) => {
  return sanitizeString(str)
    .split(' ')
    .filter(val => val !== ' ' && val !== '')
}
