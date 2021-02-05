import { IoAddSharp } from 'react-icons/io5'
// import Modal from 'react-modal'

const Add = ({ showAdd, setShowAdd }) => {
  // Modal.setAppElement('#root');
  // Modal.defaultStyles.overlay.backgroundColor = '#1a1515bf';
  return (
    <div className='tool'>
      <IoAddSharp className='tool-icon' onClick={() => setShowAdd(true)} />
      <span className='tip'>add</span>
      {/* <Modal className='modal' isOpen={showAdd} onRequestClose={() => setShowAdd(false)}>
        <button style={{ width: '50px', backgroundColor: 'red' }} onClick={() => setShowAdd(false)}>close</button>
      </Modal> */}
    </div>
  )
}

export default Add