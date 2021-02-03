import LiveList from './components/lliveList/LiveList'
import Players from './components/players/Players'
import Control from './components/control/Control'
import { useState, useEffect, useRef } from 'react'
import Open from './components/control/Open'

const App = () => {
  const [showNavbar, setNavbar] = useState(true);
  const [playerList, setPlayerList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const liveList = useRef([]);

  // add or remove player
  const playerSwitch = data => {
    // update videoList
    const index = videoList.indexOf(data);
    if(videoList[index].isEnded)
      videoList.splice(index, 1);
    else
      videoList[index].isPlaying = !videoList[index].isPlaying;
    const newVideoList = videoList;
    setVideoList(newVideoList);
    // update playerList
    if(playerList.includes(data))
      setPlayerList(playerList.filter(player => player.vid !== data.vid));
    else
      setPlayerList([...playerList, data]);
  }

  // update liveList per 60 seconds
  useEffect(() => {
    const getLiveList = async () => {
      const url = 'https://api.holotools.app/v1/live?max_upcoming_hours=2190&hide_channel_desc=1';
      try {
        const res = await fetch(url);
        const jsonData = await res.json();
        // add new live
        const prevLiveIdList = liveList.current.map(data => data.id);
        jsonData.live.forEach(info => {
          if(!prevLiveIdList.includes(info.id))
            liveList.current.push({
              name: info.channel.name,
              title: info.title,
              vid: info.yt_video_key,
              photo: info.channel.photo,
              id: info.id,
              isPlaying: false,
              isEnded: false
            });
        });
        // remove ended live
        const endedLiveList = jsonData.ended.map(info => info.id);
        liveList.current.forEach(data => {
          if(endedLiveList.includes(data.id))
            if(data.isPlaying)
              data.isEnded = true;
            else if(!data.isPlaying)
              liveList.current.splice(liveList.current.indexOf(data), 1);
        });
        setVideoList(prev => [...liveList.current]);
      } catch(err) {
        console.error(err.message);
      }
    }
    getLiveList();
    const intervalId = setInterval(getLiveList, 60000);
    return () => clearInterval(intervalId);
  }, [])

  return (
    <>
      {showNavbar &&
        <nav>
          <Control navSwitch={() => setNavbar(!showNavbar)} />
          <LiveList playerSwitch={playerSwitch} videoList={videoList} />
        </nav>
      }
      <Players showNavbar={showNavbar} playerList={playerList} />
      {!showNavbar && <Open navSwitch={() => setNavbar(!showNavbar)} />}
    </>
  );
}

export default App;
