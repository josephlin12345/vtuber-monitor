import Item from './Item'

const LiveList = ({ onClick, playerList, liveList }) => {
  return (
    <div className='nav-item'>
      {liveList && liveList.map((info) => (
        <Item
          info={info}
          key={info.id}
          onClick={onClick}
          playing={playerList.includes(info.yt_video_key)}
        />
      ))}
    </div>
  )
}

export default LiveList
