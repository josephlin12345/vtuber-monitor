import { IoMenuOutline, IoClose } from 'react-icons/io5'
import { useState } from 'react'
import Organization from './Organization'
import Schedule from './Schedule'

const Sidebar = ({ organizationsInfo, currentOrganization, setCurrentOrganization, schedule, addOtherVideo }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState();
  return (
    <>
      <div className='sidebar-icon-container'>
        <div className='tool'>
          {showSidebar ?
            <IoClose className='tool-icon' onClick={() => setShowSidebar(!showSidebar)} /> :
            <IoMenuOutline className='tool-icon' onClick={() => setShowSidebar(!showSidebar)} />
          }
          <span className='tip'>menu</span>
        </div>
      </div>
      {showSidebar &&
        <>
          <div className='sidebar'>
            {organizationsInfo.map(organization =>
              <Organization
                key={organization.name}
                image={organization.image}
                style={currentOrganization === organization.name ? { backgroundColor: '#302020' } : {}}
                setOrganization={() => {setCurrentOrganization(organization.name); setCurrentSchedule();}}
              />
            )}
          </div>
          <div className='schedule'>
            {schedule.map(video =>
              <Schedule
                key={video._id}
                video={video}
                style={currentSchedule === video ? { backgroundColor: '#302020' } : {}}
                currentSchedule={currentSchedule}
                setCurrentSchedule={() => setCurrentSchedule(video)}
                addOtherVideo={addOtherVideo}
              />
            )}
          </div>
        </>
      }
    </>
  )
}

export default Sidebar
