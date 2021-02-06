import { IoChevronDownOutline } from 'react-icons/io5'

const Open = ({ navbarSwitch }) => {
  return (
    <div className='control'>
      <div className='tool'>
        <IoChevronDownOutline
          className='tool-icon'
          onClick={navbarSwitch}
          style={{ background: '#212529' }}
        />
        <span className='tip'>open</span>
      </div>
    </div>
  )
}

export default Open
