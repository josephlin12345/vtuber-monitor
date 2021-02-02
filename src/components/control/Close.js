import { IoChevronUpOutline } from 'react-icons/io5'

const Close = ({ navSwitch }) => {
  return (
    <div className='tool'>
      <IoChevronUpOutline className='tool-icon' onClick={navSwitch} />
      <span className='tip'>close</span>
    </div>
  )
}

export default Close
