export const Notification = ({ message, type }) => {
  let messageClass = ''
  
  if (type == null) {
    return null
  }
  else if (type == 'failure') {
    messageClass = 'messageFailure'
    return (
      <div className={messageClass}>
        <p>{message}</p>
      </div>
    )
  } else if (type == 'success') {
    messageClass = 'messageSuccess'
    return (
      <div className={messageClass}>
        <p>{message}</p>
      </div>
    )
  }
}