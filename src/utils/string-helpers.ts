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

export const formatTime = (pushedAt: string, now: Date) => {
  const last = new Date(pushedAt)
  const diff = now.getTime() - last.getTime()
  const seconds = Math.floor(diff / 1000)

  const oneMinute = 60
  const oneHour = oneMinute * 60
  const oneDay = oneHour * 24
  const oneMonth = oneDay * 30

  if (seconds > oneMonth) {
    const lastPushTime = new Date(pushedAt)
    const isSameYear = now.getUTCFullYear() !== lastPushTime.getUTCFullYear()
    const split = lastPushTime.toUTCString().split(' ')

    return `Updated ${isSameYear ? 'on' : ''} ${split[2]} ${split[1]}${
      isSameYear ? `, ${split[3]}` : ''
    }`
  } else if (seconds > oneDay) {
    const days = Math.round(seconds / oneDay)
    return `Updated ${days} ${days > 1 ? 'days' : 'day'} ago`
  } else if (seconds > oneHour) {
    const hours = Math.round(seconds / oneHour)
    return `Updated ${hours} ${hours > 1 ? 'hours' : 'hour'} ago`
  } else if (seconds > oneMinute) {
    const minutes = Math.round(seconds / oneMinute)
    return `Updated ${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`
  } else {
    return 'Updated a moment ago'
  }
}
