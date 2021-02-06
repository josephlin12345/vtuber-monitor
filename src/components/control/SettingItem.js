import { IoClose, IoReorderTwo } from 'react-icons/io5'

const SettingItem = ({ channel, data, playerSwitch }) => {
  return (
    <div className='item-container'>
      <IoReorderTwo className='tool item-move' />
      <img className='item-icon' alt='' src={channel.thumbnail} />
      <span className=' item-text'>{channel.name.jp}</span>
      <IoClose className='tool close' onClick={() => playerSwitch(data, channel)} />
    </div>
  )
}

export default SettingItem
