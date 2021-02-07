import { IoClose, IoReorderTwo } from 'react-icons/io5'
import { useState } from 'react'

const SettingItem = ({ channel, data, index, playerSwitch, change, setChange }) => {
  const [dragging, setDragging] = useState(false);
  return (
    <div className='item-container'
      style={dragging ? { visibility: 'hidden' } : { visibility: 'visible' }}
      draggable={true}
      onDragStart={() => {
        setChange(prev => [index, prev[1]]);
        setTimeout(() => setDragging(true), 0);
      }}
      onDragEnter={() => setChange(prev => [prev[0], index])}
      onDragEnd={() => setDragging(false)}
    >
      <IoReorderTwo className='tool item-move' />
      <img className='item-icon' alt='' src={channel.thumbnail} />
      <span className=' item-text'>{channel.name.jp}</span>
      <IoClose className='tool close' onClick={() => playerSwitch(data, channel)} />
    </div>
  )
}

export default SettingItem
