import Live from './Live'

const LiveList = ({ playerSwitch, videoList, currentOrganization }) => {
  const filteredVideoList = videoList.filter(video => video.channel.organization === currentOrganization && !video.ordered);
  return (
    <div className='livelist'>
      {filteredVideoList && filteredVideoList.map(video =>
        <Live
          key={video._id}
          video={video}
          playerSwitch={playerSwitch}
        />
      )}
    </div>
  )
}

export default LiveList
