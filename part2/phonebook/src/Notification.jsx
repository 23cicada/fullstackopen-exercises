const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error' style={{ color: type === 'error' ? 'red' : 'green' }}>
      {message}
    </div>
  )
}

export default Notification
