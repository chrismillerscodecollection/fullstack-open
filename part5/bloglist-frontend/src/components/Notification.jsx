const Notification = ({ type, message }) => {
  switch (type) {
    case '':
      return ''
    case "error":
      return <div className="error">{message}</div>
    case "success":
      return <div className="success">{message}</div>
  }
}

export default Notification
