import { IoClose } from 'react-icons/io5'

const Live = ({ data, playerSwitch }) => {
  return (
    <div className='live'>
      <img src={data.channel.avatar}
        alt=''
        className='image'
        onClick={() => playerSwitch(data)}
        style={data.isPlaying ? { borderColor: '#ffc107' } : { borderColor: '#212529' }}
      />
      {data.isEnded && <IoClose className='image' color='red' style={{ borderColor: '#ffc107' }} onClick={() => playerSwitch(data)} />}
      <span className='tip'>{data.channel.name}</span>
    </div>
  )
}

export default Live
