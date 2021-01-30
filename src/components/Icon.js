import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5'

const Icon = ({ showLiveList, onClick }) => {
  return (
    <>
      {showLiveList ?
        <IoChevronUpOutline
          style={{ color: 'red', cursor: 'pointer', width: '40px', height: '40px', background: '#424242'}}
          className='position-absolute end-0 bottom-0 me-3 mb-1 rounded-3'
          onClick={onClick}
          title='收起(close)'
        /> :
        <IoChevronDownOutline
          style={{ color: 'red', cursor: 'pointer', width: '40px', height: '40px', background: '#212529'}}
          className='position-absolute end-0 top-0 me-3 mt-1 rounded-3'
          onClick={onClick}
          title='展開(open)'
        />
      }
    </>
  )
}

export default Icon
