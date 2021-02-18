import { IoSettingsSharp, IoClose } from 'react-icons/io5'
import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import SettingItem from './SettingItem'

const Setting = ({ playerList, playerSwitch, setPlayerList }) => {
  const [showSetting, setShowSetting] = useState(false);
  const [change, setChange] = useState([null, null]);

  const changeOrder = (start, end) => {
    const temp = playerList[start];
    playerList[start] = playerList[end];
    playerList[end] = temp;
    setPlayerList([...playerList]);
  }

  useEffect(() => {
    if(change[0] !== null && change[1] !== null) {
      changeOrder(change[0], change[1])
      setChange(prev => [prev[1], null])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change])

  return (
    <div className='tool'>
      <IoSettingsSharp className='tool-icon' onClick={() => setShowSetting(true)} />
      <span className='tip'>setting</span>
      <Modal className='modal center' isOpen={showSetting} onRequestClose={() => setShowSetting(false)}>
        <div className='form center'>
          <IoClose className='tool close' onClick={() => setShowSetting(false)} />
          <div className='player-control-panel' onDragOver={e => e.preventDefault()}>
            {playerList.map(video =>
              <SettingItem
                key={video._id}
                video={video}
                index={playerList.indexOf(video)}
                playerSwitch={playerSwitch}
                setChange={setChange}
              />
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Setting
