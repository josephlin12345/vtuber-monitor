import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5'
import Add from './Add'
import Setting from './Setting'

const Icons = ({ showLiveList, onClick }) => {
  return (
    <div>
      {showLiveList ?
        <div className='position-absolute me-2 mt-2' style={{ top: '0px', right: '0px' }}>
          <Add  />
          <Setting />
          <IoChevronUpOutline
            style={{ color: 'red', cursor: 'pointer', width: '40px', height: '40px', background: '#424242' }}
            className='rounded-3'
            onClick={onClick}
            title='收起(close)'
          />
        </div> :
        <div className='position-absolute me-2 mt-2' style={{ top: '0px', right: '0px' }}>
          <IoChevronDownOutline
            style={{ color: 'red', cursor: 'pointer', width: '40px', height: '40px', background: '#212529' }}
            className='rounded-3'
            onClick={onClick}
            title='展開(open)'
          />
        </div>
      }
    </div>
  )
}

export default Icons
