import Live from './Live'

const LiveList = ({ playerSwitch, playerList, liveList }) => {
  return (
    <div className='livelist'>
      {liveList && liveList.map((info) => (
        <Live
          info={info}
          key={info.id}
          playerSwitch={playerSwitch}
          playing={playerList.includes(info.yt_video_key)}
        />
      ))}
    </div>
  )
}

export default LiveList
