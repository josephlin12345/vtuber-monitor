import { IoAddSharp } from 'react-icons/io5'

const Add = () => {
  return (
    <IoAddSharp
      className='ms-1 rounded-3'
      style={{ color: 'red', cursor: 'pointer', width: '40px', height: '40px', background: '#424242'}}
      title='增加指定影片(add)'
    />
  )
}

export default Add