import { useState, useEffect, useRef } from 'react'
import LiveList from './components/liveList/LiveList'
import PlayerGrid from './components/players/PlayerGrid'
import Control from './components/control/Control'
import Open from './components/control/Open'
import Sidebar from './components/sidebar/Sidebar'

const query = async QUERY => {
  const graphql = 'https://api.chooks.app/v1';
  const res = await fetch(graphql, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: QUERY })
  });
  const jsonData = await res.json();
  return await jsonData.data;
}

const organizationsInfo = [
  {name: 'Hololive', image: 'https://hololive.jetri.co/543a3b13045e7fc3411b70357388d2e5.png'},
  {name: 'Nijisanji', image: 'https://hololive.jetri.co/1158f60d96fbee3081984add9dfdb33f.png'},
  // {name: 'AniMare', image: 'https://hololive.jetri.co/ca275bd058b943dfeb7b1148426d1578.png'},
  // {name: 'Hanayori Joshiryo', image: 'https://hololive.jetri.co/42f9e13088996a823deaef18ca8c815b.png'},
  // {name: 'HoneyStrap', image: 'https://hololive.jetri.co/86db37290bbd861a843d41ab07ad4c2f.png'},
  {name: 'Nori Pro', image: 'https://hololive.jetri.co/b99d4ceafeef87716b067f3ae8ebee3a.png'},
  {name: 'ReACT', image: 'https://hololive.jetri.co/a976929b51ec52bb36ddf8c37a885248.png'},
  // {name: 'SugarLyric', image: ''},
  // {name: 'VApArt', image: 'https://hololive.jetri.co/1316765173786d5baec9977d83be6c39.png'},
  // {name: 'ViViD', image: 'https://hololive.jetri.co/24fd989c78b3c5c6092d4c17d2cec7c4.png'},
  // {name: 'X enc\'ount', image: 'https://hololive.jetri.co/78d0c92376aa08de3aef2c2b37c65f92.png'},
  // {name: 'Idol-bu', image: ''},
  // {name: 'VOMS', image: 'https://hololive.jetri.co/441c300fbf0f0b510f41cdee556764e0.png'},
  {name: 'Independents', image: 'https://hololive.jetri.co/0673292ded4afa44a5df09f31f77ac34.png'},
  // {name: '.LIVE', image: 'https://hololive.jetri.co/85cd3867eb6d5aac74399b9fcbb37776.png'},

  // {name: 'Atelier Live', image: ''},
  // {name: 'Chukorara', image: ''},
  // {name: 'Eilene Family'},
  // {name: 'Iridori'},
  // {name: 'Kizuna Ai Inc.'},
  // {name: 'Marbl_s'},
  // {name: 'Tsunderia'},
  // {name: 'V Dimension.Creators'},
  // {name: 'VShojo'},
  // {name: 'Yuni Create'},
  // {name: 'upd8'}
]

const App = () => {
  const [showNavbar, setNavbar] = useState(true);
  const [playerList, setPlayerList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [currentOrganization, setCurrentOrganization] = useState('Hololive');
  const liveList = useRef([]);
  const channelList = useRef(new Set([{
    channel_id: 'default',
    thumbnail: 'https://www.gstatic.com/youtube/img/branding/favicon/favicon_144x144.png',
    name: {
      jp: 'Youtube'
    }
  }]));

  // update lists
  const updateLists = videoList => {
    liveList.current = videoList;
    setVideoList(videoList);
    setPlayerList(videoList.filter(data => data.isPlaying));
  }

  // add or remove player
  const playerSwitch = (data, channel) => {
    // update videoList and playerList
    const index = videoList.indexOf(data);
    if(videoList[index].isEnded || channel.channel_id === 'default')
      videoList.splice(index, 1);
    else
      videoList[index].isPlaying = !videoList[index].isPlaying;
    updateLists(videoList);
  }

  // add other video and filter them
  const addOtherVideo = video => {
    for(const data of videoList)
      if(data._id === video._id) {
        data.isPlaying = true;
        updateLists(videoList);
        return
      }
    videoList.push(video);
    updateLists(videoList);
  }

  // update liveList per 60 seconds
  useEffect(() => {
    const getLiveList = async () => {
      // query live
      const liveQuery = `query {
        live(organizations: [${organizationsInfo.map(organization => `"${organization.name}"`).join(', ')}]) {
          _id,
          channel_id,
          status,
          organization,
          title,
          time{
            start,
            scheduled
          }
        }
      }`
      const newLive = await query(liveQuery);

      // add new live
      const prevLiveIdList = liveList.current.map(data => data._id);
      const newChannels = [];
      newLive.live.forEach(data => {
        if(!prevLiveIdList.includes(data._id)) {
          liveList.current.push({
            ...data,
            url: `https://youtu.be/${data._id}`,
            isPlaying: false,
            isEnded: false
          });
          newChannels.push(`"${data.channel_id}"`);
        }
      });

      // remove ended live
      const newLiveIdList = newLive.live.map(data => data._id);
      liveList.current.forEach(live => {
        if(!newLiveIdList.includes(live._id))
          if(live.isPlaying)
            live.isEnded = true;
          else {
            const index = liveList.current.indexOf(live);
            liveList.current.splice(index, 1);
          }
      })

      // query channels
      if(newChannels.length !== 0) {
        const channelsQuery = `query {
          channels(channel_id: [${newChannels.join(', ')}]) {
            items {
              name {
                en,
                jp,
                kr,
                cn
              },
              organization,
              channel_name,
              channel_id,
              thumbnail
            },
            next_page_token
          }
        }`
        const channels = await query(channelsQuery);
        channelList.current = new Set([...channelList.current, ...channels.channels.items])
  
        // query next channels
        let next_page_token = channels.channels.next_page_token;
        while(next_page_token) {
          const nextChannelsQuery = `query {
            channels(page_token: "${next_page_token}") {
              items {
                name {
                  en,
                  jp,
                  kr,
                  cn
                },
                organization,
                channel_name,
                channel_id,
                thumbnail
              },
              next_page_token
            }
          }`
          const nextChannels = await query(nextChannelsQuery);
          channelList.current = new Set([...channelList.current, ...nextChannels.channels.items])
          next_page_token = nextChannels.channels.next_page_token
        }
      }

      setVideoList([...liveList.current]);
    }
    getLiveList();
    const intervalId = setInterval(getLiveList, 60000);
    return () => clearInterval(intervalId);
  }, [])

  return (
    <>
      {showNavbar &&
        <nav className='navbar'>
          <Control
            navbarSwitch={() => setNavbar(!showNavbar)}
            addOtherVideo={addOtherVideo}
            playerList={playerList}
            channelList={channelList.current}
            playerSwitch={playerSwitch}
          />
          <Sidebar
            organizationsInfo={organizationsInfo}
            setCurrentOrganization={setCurrentOrganization}
            currentOrganization={currentOrganization}
          />
          <LiveList
            playerSwitch={playerSwitch}
            videoList={videoList}
            channelList={channelList.current}
            currentOrganization={currentOrganization}
          />
        </nav>
      }
      <PlayerGrid showNavbar={showNavbar} playerList={playerList} />
      {!showNavbar && <Open navbarSwitch={() => setNavbar(!showNavbar)} />}
    </>
  );
}

export default App
