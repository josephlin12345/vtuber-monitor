import { IoSettingsSharp, IoClose } from 'react-icons/io5'
import Modal from 'react-modal'
import { useState } from 'react'
import SettingItem from './SettingItem'

const Setting = ({ playerList, channelList, playerSwitch, setPlayerList }) => {
  const [showSetting, setShowSetting] = useState(false);
  const channels = [...channelList.values()];
  const [change, setChange] = useState([null, null]);

  const changeOrder = (start, end) => {
    const temp = playerList[start];
    playerList[start] = playerList[end];
    playerList[end] = temp;
    setPlayerList([...playerList]);
  }

  if(change[0] !== null && change[1] !== null) {
    setChange(prev => [prev[1], null])
    changeOrder(change[0], change[1])
  }

  return (
    <div className='tool'>
      <IoSettingsSharp className='tool-icon' onClick={() => setShowSetting(true)} />
      <span className='tip'>setting</span>
      <Modal className='modal center' isOpen={showSetting} onRequestClose={() => setShowSetting(false)}>
        <div className='form center'>
          <IoClose className='tool close' onClick={() => setShowSetting(false)} />
          <div className='player-control-panel' onDragOver={e => e.preventDefault()}>
            {playerList.map(data => (
              <SettingItem
                key={data._id}
                channel={channels.find(channel => channel.channel_id === data.channel_id)}
                data={data}
                index={playerList.indexOf(data)}
                playerSwitch={playerSwitch}
                change={change}
                setChange={setChange}
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Setting
