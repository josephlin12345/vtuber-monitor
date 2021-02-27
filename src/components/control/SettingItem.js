import { IoClose, IoReorderTwo, IoPlay } from 'react-icons/io5'
import { useState } from 'react'

const SettingItem = ({ video, index, playerSwitch, setChange }) => {
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
      {video.channel ?
        <img className='item-icon' alt='' src={video.channel.avatar} /> :
        <IoPlay className='item-icon' />
      }
      <span className='item-text'>{video.channel && video.channel.name ? video.channel.name : video._id}</span>
      <IoClose className='tool close' onClick={() => playerSwitch(video)} />
    </div>
  )
}

export default SettingItem
