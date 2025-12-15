import { useState } from 'react'

const Togglable = ({ children, buttonLabel }) => {
  const [visible, setVisible] = useState(false)
  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }
  return (
    <div>
      <div style={hide}>
        <button onClick={() => setVisible(true)}>{buttonLabel}</button>
      </div>
      <div style={show}>
        {children}
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable
