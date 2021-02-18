import { IoClose } from 'react-icons/io5'

const Live = ({ video, playerSwitch }) => {
  return (
    <div className='live'>
      <img src={video.channel.avatar}
        alt=''
        className='image'
        onClick={() => playerSwitch(video)}
        style={video.isPlaying ? { borderColor: '#ffc107' } : { borderColor: '#212529' }}
      />
      {video.isEnded &&
        <IoClose
          className='image'
          color='red'
          style={{ borderColor: '#ffc107' }}
          onClick={() => playerSwitch(video)}
        />
      }
      <span className='tip'>{video.channel.name}</span>
    </div>
  )
}

export default Live
