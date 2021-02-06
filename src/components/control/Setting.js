import { IoSettingsSharp, IoClose } from 'react-icons/io5'
import Modal from 'react-modal'
import { useState } from 'react'
import SettingItem from './SettingItem'

const Setting = ({ playerList, channelList, playerSwitch }) => {
  const [showSetting, setShowSetting] = useState(false);
  const channels = [...channelList.values()];

  return (
    <div className='tool'>
      <IoSettingsSharp className='tool-icon' onClick={() => setShowSetting(true)} />
      <span className='tip'>setting</span>
      <Modal className='modal center' isOpen={showSetting} onRequestClose={() => setShowSetting(false)}>
        <div className='form center'>
          <IoClose className='tool close' onClick={() => setShowSetting(false)} />
          <div className='player-control-panel'>
            {playerList.map(data => (
              <SettingItem
                key={data._id}
                channel={channels.find(channel => channel.channel_id === data.channel_id)}
                data={data}
                playerSwitch={playerSwitch}
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Setting
