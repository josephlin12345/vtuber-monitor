const Live = ({ info, playerSwitch, playing }) => {
  return (
    <div className='live' onClick={() => playerSwitch(info.yt_video_key)} >
      <img src={info.channel.photo}
        alt=''
        title={`${info.channel.name} - ${info.title}`}
        className='image'
        style={playing ? { borderColor: '#ffc107' } : { borderColor: '#212529' }}
      />
    </div>
  )
}

export default Live
