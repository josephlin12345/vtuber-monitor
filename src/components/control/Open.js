import { IoChevronDownOutline } from 'react-icons/io5'

const Open = ({ navSwitch }) => {
  return (
    <IoChevronDownOutline
      className='control icon'
      onClick={navSwitch}
      title='展開(open)'
      style={{ background: '#212529' }}
    />
  )
}

export default Open
