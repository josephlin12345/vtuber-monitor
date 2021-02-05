import { IoAddSharp } from 'react-icons/io5'
import Modal from 'react-modal'

const Add = ({ showAdd, setShowAdd }) => {
  return (
    <div className='tool'>
      <IoAddSharp className='tool-icon' onClick={() => setShowAdd(true)} />
      <span className='tip'>add</span>
      <Modal className='modal center' isOpen={showAdd} onRequestClose={() => setShowAdd(false)}>
        <button style={{ width: '50px', backgroundColor: 'red' }} onClick={() => setShowAdd(false)}>close</button>
      </Modal>
    </div>
  )
}

export default Add