import { useState, useEffect, useRef } from 'react'
import LiveList from './components/liveList/LiveList'
import PlayerGrid from './components/players/PlayerGrid'
import Control from './components/control/Control'
import Open from './components/control/Open'
import Sidebar from './components/sidebar/Sidebar'
import axios from 'axios'

const organizationsInfo = [
  {name: 'Hololive', image: 'https://hololive.jetri.co/543a3b13045e7fc3411b70357388d2e5.png'},
  {name: 'Hololive-EN', image: 'https://hololive.jetri.co/543a3b13045e7fc3411b70357388d2e5.png'},
  {name: 'Hololive-ID', image: 'https://hololive.jetri.co/543a3b13045e7fc3411b70357388d2e5.png'},
  {name: 'Holostars', image: 'https://hololive.jetri.co/543a3b13045e7fc3411b70357388d2e5.png'},
  {name: 'Nijisanji', image: 'https://hololive.jetri.co/1158f60d96fbee3081984add9dfdb33f.png'},
  {name: 'AniMare', image: 'https://hololive.jetri.co/ca275bd058b943dfeb7b1148426d1578.png'},
  // {name: 'Hanayori Joshiryo', image: 'https://hololive.jetri.co/42f9e13088996a823deaef18ca8c815b.png'},
  {name: 'HoneyStrap', image: 'https://hololive.jetri.co/86db37290bbd861a843d41ab07ad4c2f.png'},
  {name: 'Nori Pro', image: 'https://hololive.jetri.co/b99d4ceafeef87716b067f3ae8ebee3a.png'},
  {name: 'ReACT', image: 'https://hololive.jetri.co/a976929b51ec52bb36ddf8c37a885248.png'},
  {name: 'VApArt', image: 'https://hololive.jetri.co/1316765173786d5baec9977d83be6c39.png'},
  {name: 'ViViD', image: 'https://hololive.jetri.co/24fd989c78b3c5c6092d4c17d2cec7c4.png'},
  {name: 'VOMS', image: 'https://hololive.jetri.co/441c300fbf0f0b510f41cdee556764e0.png'},
  // {name: 'X enc\'ount', image: 'https://hololive.jetri.co/78d0c92376aa08de3aef2c2b37c65f92.png'},
  {name: '.LIVE', image: 'https://hololive.jetri.co/85cd3867eb6d5aac74399b9fcbb37776.png'},
  {name: 'Independents', image: 'https://hololive.jetri.co/0673292ded4afa44a5df09f31f77ac34.png'},
  // {name: 'Idol-bu', image: ''},
  // {name: 'SugarLyric', image: ''},
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
const organizationNames = organizationsInfo.map(organization => `"${organization.name.replace('"', '\\"')}"`).join(', ');

const query = async QUERY => {
  const server = 'https://vtuber-monitor-mongodb.herokuapp.com/';
  const res = await axios({
    url: server,
    method: 'post',
    data: { query: QUERY }
  });
  return res.data;
}

const App = () => {
  const [showNavbar, setNavbar] = useState(true);
  const [playerList, setPlayerList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [currentOrganization, setCurrentOrganization] = useState(organizationsInfo[0].name);
  const [schedule, setSchedule] = useState([]);
  const liveList = useRef([]);

  // add or remove player
  const playerSwitch = video => {
    // update videoList and playerList
    if(video.isEnded) {
      videoList.splice(videoList.indexOf(video), 1);
      setPlayerList(prev => prev.filter(player => player !== video));
    }
    else {
      video.isPlaying = !video.isPlaying;
      if(video.isPlaying)
        setPlayerList(prev => [...prev, video]);
      else
        setPlayerList(prev => prev.filter(player => player !== video));
    }
  }

  // add other video
  const addOtherVideo = video => {
    if(!videoList.find(item => item._id === video._id)) {
      videoList.push(video);
    }
    playerSwitch(video);
  }

  // update liveList per 60 seconds
  useEffect(() => {
    const getData = async () => {
      // query live
      const liveQuery = `{
        video(organizations: [${organizationNames}] status: "LIVE" ) {
          _id,
          url,
          channel {
            name,
            avatar,
            organization
          }
        }
      }`
      const liveData = await query(liveQuery);
      const newLive =  liveData.data.video;

      // add new live
      newLive.forEach(video => {
        const data = liveList.current.find(data => data._id === video._id);
        if(!data)
          liveList.current.push(video);
        else
          data.startTime = null;
      });

      // remove ended live
      liveList.current.forEach(video => {
        if(!newLive.find(data => data._id === video._id) && !video.startTime)
          if(video.isPlaying)
            video.isEnded = true;
          else {
            const index = liveList.current.indexOf(video);
            liveList.current.splice(index, 1);
          }
      })

      setVideoList(liveList.current);

      // query schedule
      const scheduleQuery = `{
        schedule( organizations: [${organizationNames}] unixTime: ${Math.floor(Date.now() / 1000) + 86400} ) {
          _id,
          url,
          startTime,
          thumbnail,
          title,
          channel {
            name,
            avatar,
            organization
          }
        }
      }`
      const scheduleData = await query(scheduleQuery);
      setSchedule(scheduleData.data.schedule);
    }
    getData();
    const intervalId = setInterval(getData, 60000);
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
            playerSwitch={playerSwitch}
            setPlayerList={setPlayerList}
          />
          <Sidebar
            organizationsInfo={organizationsInfo}
            setCurrentOrganization={setCurrentOrganization}
            currentOrganization={currentOrganization}
            schedule={schedule.filter(video => video.channel.organization === currentOrganization)}
            addOtherVideo={addOtherVideo}
          />
          <LiveList
            playerSwitch={playerSwitch}
            videoList={videoList}
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
