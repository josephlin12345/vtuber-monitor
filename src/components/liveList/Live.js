import { IoClose } from 'react-icons/io5'

const Live = ({ data, channel, playerSwitch }) => {
  return (
    <div className='live'>
      <img src={channel.thumbnail}
        alt=''
        className='image'
        onClick={() => playerSwitch(data, channel)}
        style={data.isPlaying ? { borderColor: '#ffc107' } : { borderColor: '#212529' }}
      />
      {data.isEnded && <IoClose className='image' color='red' style={{ borderColor: '#ffc107' }} onClick={() => playerSwitch(data, channel)} />}
      <span className='tip'>{channel.channel_name}</span>
    </div>
  )
}

export default Live
