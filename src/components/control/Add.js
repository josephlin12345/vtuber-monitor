import { IoAddSharp, IoLink, IoArrowForwardCircle, IoClose } from 'react-icons/io5'
import Modal from 'react-modal'
import { useState, useRef } from 'react'
import ReactPlayer from 'react-player'

const Add = ({ addOtherVideo }) => {
  const getLink = () => {
    if(document.querySelector('.form-btn').classList.contains('btn-enable')) {
      const video = {
        _id: `Custom ${custom}`,
        url: input.current.value
      }
      addOtherVideo(video);
      setCustom(custom + 1);
      setShowAdd(false);
    }
  }

  const validation = () => {
    if(ReactPlayer.canPlay(input.current.value))
      document.querySelector('.form-btn').classList.add('btn-enable');
    else
      document.querySelector('.form-btn').classList.remove('btn-enable');
  }

  const input = useRef();
  const [custom, setCustom] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div className='tool'>
      <IoAddSharp className='tool-icon' onClick={() => setShowAdd(true)} />
      <span className='tip'>add</span>
      <Modal className='modal center' isOpen={showAdd} onRequestClose={() => setShowAdd(false)}>
        <div className='form center'>
          <IoClose className='tool close' onClick={() => setShowAdd(false)} />
          <IoLink className='tool' />
          <input
            ref={input}
            className='form-text'
            type='text'
            placeholder='Enter Link'
            onInput={validation}
            autoFocus
          />
          <IoArrowForwardCircle className='tool form-btn' onClick={getLink} />
        </div>
      </Modal>
    </div>
  )
}

export default Add