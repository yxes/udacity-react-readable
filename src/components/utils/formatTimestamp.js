function formatTimestamp (timestamp) {
  if (timestamp === undefined) return ''

  const d = new Date(timestamp)
  return d.toUTCString().split(' ').splice(1,4).join(' ')
}

export default formatTimestamp
