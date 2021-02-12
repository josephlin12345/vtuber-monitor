import { IoClose, IoReorderTwo } from 'react-icons/io5'
import { useState } from 'react'

const SettingItem = ({ data, index, playerSwitch, setChange }) => {
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
      <img className='item-icon' alt='' src={data.channel_thumbnail} />
      <span className=' item-text'>{data.channel_name ? data.channel_name : data._id}</span>
      <IoClose className='tool close' onClick={() => playerSwitch(data)} />
    </div>
  )
}

export default SettingItem
