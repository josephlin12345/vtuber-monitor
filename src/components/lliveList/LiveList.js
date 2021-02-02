import Live from './Live'

const LiveList = ({ playerSwitch, videoList }) => {
  return (
    <div className='livelist'>
      {videoList && videoList.map(data => (
        <Live
          data={data}
          key={data.id}
          playerSwitch={playerSwitch}
        />
      ))}
    </div>
  )
}

export default LiveList
