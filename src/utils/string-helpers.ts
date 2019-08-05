export const sanitizeString = (str: string) =>
  str.replace(/[^a-zA-Z0-9]/gi, ' ')

export const stringToArray = (str: string) => {
  return sanitizeString(str)
    .split(' ')
    .filter(val => val !== ' ' && val !== '')
}

// Usage:
// getTextWidth('PowerShell', 'bold 12px Open Sans')
export const getTextWidth = Object.assign(
  (text: string, font: string) => {
    // re-use canvas object for better performance
    var canvas: HTMLCanvasElement =
      getTextWidth.canvas ||
      (getTextWidth.canvas = document.createElement('canvas'))

    var context = canvas.getContext('2d')

    if (!context) return -1

    context.font = font
    var metrics = context.measureText(text)

    return metrics.width
  },
  {
    canvas: <HTMLCanvasElement | null>null
  }
)
