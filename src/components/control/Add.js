import { IoAddSharp, IoLink, IoArrowForwardCircle, IoClose } from 'react-icons/io5'
import Modal from 'react-modal'
import { useState, useRef } from 'react'

const MATCH_URL_YOUTUBE = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//;

const Add = ({ addOtherVideo }) => {
  const getLink = () => {
    if(document.querySelector('.form-btn').classList.contains('btn-enable')) {
      const url = input.current.value;
      const video = {
        _id: getId(url),
        url: url,
        channel: {
          _id: null,
          name: null,
          avatar: 'https://www.gstatic.com/youtube/img/branding/favicon/favicon_144x144.png',
          organization: 'youtube',
        },
        isPlaying: true,
        isEnded: true,
      }
      addOtherVideo(video);
      setShowAdd(false);
    }
  }

  const validation = () => {
    if(getId(input.current.value))
      document.querySelector('.form-btn').classList.add('btn-enable');
    else
      document.querySelector('.form-btn').classList.remove('btn-enable');
  }

  const getId = url => {
    const match = url.match(MATCH_URL_YOUTUBE);
    return match ? match[1] : false;
  }

  const input = useRef();
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div className='tool'>
      <IoAddSharp className='tool-icon' onClick={() => setShowAdd(true)} />
      <span className='tip'>add</span>
      <Modal className='modal center' isOpen={showAdd} onRequestClose={() => setShowAdd(false)}>
        <div className='form center'>
          <IoClose className='tool close' onClick={() => setShowAdd(false)} />
          <IoLink className='tool' />
          <input ref={input} className='form-text' type='text' placeholder='Youtube Link' onInput={validation} autoFocus />
          <IoArrowForwardCircle className='tool form-btn' onClick={getLink} />
        </div>
      </Modal>
    </div>
  )
}

export default Add