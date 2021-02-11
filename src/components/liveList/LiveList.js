import Live from './Live'

const LiveList = ({ playerSwitch, videoList, currentOrganization }) => {
  const filteredVideoList = videoList.filter(data => data.organization === currentOrganization);
  return (
    <div className='livelist'>
      {filteredVideoList && filteredVideoList.map(data => (
        <Live
          key={data._id}
          data={data}
          playerSwitch={playerSwitch}
        />
      ))}
    </div>
  )
}

export default LiveList
