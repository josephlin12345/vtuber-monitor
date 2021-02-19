import ReactDom from 'react-dom'

const Schedule = ({ video, style, currentSchedule, setCurrentSchedule, addOtherVideo }) => {
  return (
    <div className='schedule-container' onClick={setCurrentSchedule} style={style}>
      <img className='schedule-avatar' src={video.channel.avatar} alt='' />
      <div className='schedule-text'>
        <span className='item-text'>{video.channel.name}</span>
        <span className='item-text'>{new Date(video.startTime * 1000).toLocaleString()}</span>
      </div>
      {currentSchedule === video && ReactDom.createPortal(
        <div className='schedule-info-container' onClick={() => addOtherVideo(video)}>
          <img className='schedule-thumbnail' src={video.thumbnail} alt='' />
          <span className='schedule-title item-text'>{video.title}</span>
        </div>
      , document.getElementById('root'))}
    </div>
  )
}

export default Schedule
