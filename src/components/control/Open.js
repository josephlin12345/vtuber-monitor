import { IoChevronDownOutline } from 'react-icons/io5'

const Open = ({ navSwitch }) => {
  return (
    <div className='control'>
      <div className='tool'>
        <IoChevronDownOutline
          className='tool-icon'
          onClick={navSwitch}
          style={{ background: '#212529' }}
        />
        <span className='tip'>open</span>
      </div>
    </div>
  )
}

export default Open
