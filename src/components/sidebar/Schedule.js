const Schedule = ({ video }) => {
  return (
    <div className='schedule-container'>
      <img className='schedule-thumbnail' src={video.channel.avatar} alt='' />
      <div className='schedule-text'>
        <span className='item-text'>{video.channel.name}</span>
        <span className='item-text'>{new Date(video.startTime * 1000).toLocaleString()}</span>
      </div>
    </div>
  )
}

export default Schedule
