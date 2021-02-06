import Add from './Add'
import Setting from './Setting'
import Close from './Close'
import Modal from 'react-modal'

Modal.setAppElement('#root');
Modal.defaultStyles.overlay.backgroundColor = '#1a1515bf';

const Control = ({ navbarSwitch, addOtherVideo, playerList, channelList, playerSwitch }) => {
  return (
    <div className='control'>
      <Add addOtherVideo={addOtherVideo} />
      <Setting playerList={playerList} channelList={channelList} playerSwitch={playerSwitch} />
      <Close navbarSwitch={navbarSwitch} />
    </div>
  )
}

export default Control
