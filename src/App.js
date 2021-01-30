import LiveList from './components/LiveList'
import Players from './components/Players'
import Icon from './components/Icon'
import { useState, useEffect } from 'react'

const App = () => {
  const [showLiveList, setShowLiveList] = useState(() => true);
  const [playerList, setPlayerList] = useState(() => []);
  const [liveList, setLiveList] = useState(() => []);

  const onClick = (vid) => {
    if(playerList.includes(vid)) {
      setPlayerList(playerList.filter(player => player !== vid))
    }
    else {
      setPlayerList([...playerList, vid]);
    }
  }

  useEffect(() => {
    const getLiveList = async () => {
      const url = 'https://api.holotools.app/v1/live?max_upcoming_hours=2190&hide_channel_desc=1';
      try {
        const res = await fetch(url);
        const jsonData = await res.json();
        setLiveList(jsonData.live);
      } catch(err) {
        console.error(err.message);
      }
    }
    getLiveList();
    const intervalId = setInterval(() => getLiveList(), 60000);
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const newPlayerList = playerList.filter(vid => liveList.map(info => info.yt_video_key).includes(vid));
    if(playerList.toString() !== newPlayerList.toString()) {
      setPlayerList(newPlayerList)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveList])

  return (
    <>
      {showLiveList &&
        <nav className='navbar navbar-expand bg-dark'>
          <LiveList onClick={onClick} playerList={playerList} liveList={liveList}/>
          <Icon showLiveList={showLiveList} onClick={() => setShowLiveList(!showLiveList)} />
        </nav>
      }
      <div className='container-fluid'>
        {!showLiveList && <Icon showLiveList={showLiveList} onClick={() => setShowLiveList(!showLiveList)} />}
        <Players playerList={playerList}/>
      </div>
    </>
  );
}

export default App;
