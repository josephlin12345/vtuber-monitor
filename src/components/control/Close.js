import { IoChevronUpOutline } from 'react-icons/io5'

const Close = ({ navbarSwitch }) => {
  return (
    <div className='tool'>
      <IoChevronUpOutline className='tool-icon' onClick={navbarSwitch} />
      <span className='tip'>close</span>
    </div>
  )
}

export default Close
