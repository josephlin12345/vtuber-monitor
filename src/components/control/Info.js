import { IoAlertCircleOutline } from 'react-icons/io5'

const Info = () => {
  return (
    <div className='tool'>
      <IoAlertCircleOutline className='tool-icon' onClick={() => window.open('https://github.com/josephlin12345/vtuber-monitor')} />
      <span className='tip'>about</span>
    </div>
  )
}

export default Info
