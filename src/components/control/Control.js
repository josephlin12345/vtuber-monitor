// import Add from './Add'
// import Setting from './Setting'
import Close from './Close'

const Control = ({ navSwitch }) => {
  return (
    <div className='control'>
      {/* <Add /> */}
      {/* <Setting /> */}
      <Close navSwitch={navSwitch} />
    </div>
  )
}

export default Control
