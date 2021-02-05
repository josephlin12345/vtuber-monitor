// import Add from './Add'
// import Setting from './Setting'
import Close from './Close'
// import { useState } from 'react'

const Control = ({ navSwitch }) => {
  // const [showAdd, setShowAdd] = useState(false);
  // const [showSetting, setShowSetting] = useState(false);
  return (
    <div className='control'>
      {/* <Add showAdd={showAdd} setShowAdd={setShowAdd} />
      <Setting showSetting={showSetting} /> */}
      <Close navSwitch={navSwitch} />
    </div>
  )
}

export default Control
