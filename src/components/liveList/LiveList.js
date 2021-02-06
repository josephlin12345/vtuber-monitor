import Live from './Live'

const LiveList = ({ playerSwitch, videoList, channelList, currentOrganization }) => {
  const channels = [...channelList.values()];
  const filteredVideoList = videoList.filter(data => data.organization === currentOrganization);
  return (
    <div className='livelist'>
      {filteredVideoList && filteredVideoList.map(data => (
        <Live
          key={data._id}
          data={data}
          playerSwitch={playerSwitch}
          channel={channels.find(channel => channel.channel_id === data.channel_id)}
        />
      ))}
    </div>
  )
}

export default LiveList
