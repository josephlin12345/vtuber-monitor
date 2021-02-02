import { IoChevronUpOutline } from 'react-icons/io5'

const Close = ({ navSwitch }) => {
  return (
    <div className='tool'>
      <IoChevronUpOutline className='icon' onClick={navSwitch} />
      <span className='tip'>收起(close)</span>
    </div>
  )
}

export default Close
