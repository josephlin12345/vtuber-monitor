import Add from './Add'
import Setting from './Setting'
import Close from './Close'
import Modal from 'react-modal'

Modal.setAppElement('#root');
Modal.defaultStyles.overlay.backgroundColor = '#1a1515bf';

const Control = ({ navbarSwitch, addOtherVideo, playerList, playerSwitch, setPlayerList }) => {
  return (
    <div className='control'>
      <Add addOtherVideo={addOtherVideo} />
      <Setting
        playerList={playerList}
        playerSwitch={playerSwitch}
        setPlayerList={setPlayerList}
      />
      <Close navbarSwitch={navbarSwitch} />
    </div>
  )
}

export default Control
