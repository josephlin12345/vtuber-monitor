import { IoClose } from 'react-icons/io5'

const Live = ({ data, playerSwitch }) => {
  return (
    <div className='live'>
      <img src={data.photo}
        alt=''
        onClick={() => playerSwitch(data)}
        className='image'
        style={data.isPlaying ? { borderColor: '#ffc107' } : { borderColor: '#212529' }}
      />
      {data.isEnded && <IoClose className='image' color='red' style={{ borderColor: '#ffc107' }} />}
      <span className='tip'>{data.name}</span>
    </div>
  )
}

export default Live
