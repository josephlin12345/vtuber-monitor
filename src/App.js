import LiveList from './components/lliveList/LiveList'
import Players from './components/players/Players'
import Control from './components/control/Control'
import { useState, useEffect } from 'react'
import Open from './components/control/Open'

const App = () => {
  const [showNavbar, setNavbar] = useState(true);
  const [playerList, setPlayerList] = useState([]);
  const [liveList, setLiveList] = useState([]);

  // add or remove player
  const playerSwitch = (vid) => {
    if(playerList.includes(vid))
      setPlayerList(playerList.filter(player => player !== vid))
    else
      setPlayerList([...playerList, vid]);
  }

  // update liveList per 60 seconds
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
    const intervalId = setInterval(getLiveList, 60000);
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // update playerList when liveList updated
  useEffect(() => {
    const newPlayerList = playerList.filter(vid => liveList.map(info => info.yt_video_key).includes(vid));
    if(playerList.toString() !== newPlayerList.toString()) {
      setPlayerList(newPlayerList)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveList])

  return (
    <>
      {showNavbar &&
        <nav>
          <Control navSwitch={() => setNavbar(!showNavbar)} />
          <LiveList playerSwitch={playerSwitch} playerList={playerList} liveList={liveList} />
        </nav>
      }
      <Players showNavbar={showNavbar} playerList={playerList} />
      {!showNavbar && <Open navSwitch={() => setNavbar(!showNavbar)} />}
    </>
  );
}

export default App;
