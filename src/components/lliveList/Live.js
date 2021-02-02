import { IoClose } from 'react-icons/io5'

const Live = ({ data, playerSwitch }) => {
  return (
    <div className='live' onClick={() => playerSwitch(data)} >
      <img src={data.photo}
        alt=''
        title={`${data.name} - ${data.title}`}
        className='image'
        style={data.isPlaying ? { borderColor: '#ffc107' } : { borderColor: '#212529' }}
      />
      {data.isEnded && <IoClose className='image' color='red' style={{ borderColor: '#ffc107' }} />}
    </div>
  )
}

export default Live
