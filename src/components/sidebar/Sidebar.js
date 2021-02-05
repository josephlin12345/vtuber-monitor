import { IoMenuOutline, IoClose } from 'react-icons/io5'
import { useState } from 'react'
import Organization from './Organization'

const Sidebar = ({ organizationsInfo, currentOrganization, setCurrentOrganization }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [current] = organizationsInfo.filter(organization => organization.name === currentOrganization);
  return (
    <>
      <div className='sidebar-icon-contianer'>
        <div className='tool'>
          {showSidebar ?
            <IoClose className='tool-icon' onClick={() => setShowSidebar(!showSidebar)} /> :
            <IoMenuOutline className='tool-icon' onClick={() => setShowSidebar(!showSidebar)} />
          }
          <span className='tip'>menu</span>
        </div>
      </div>
      {showSidebar &&
        <div className='sidebar'>
          {organizationsInfo.map(organization => (
            <Organization
              key={organization.name}
              image={organization.image}
              style={current === organization ? { backgroundColor: '#302020' } : {}}
              setOrganization={() => setCurrentOrganization(organization.name)}
            />
          ))}
        </div>
      }
    </>
  )
}

export default Sidebar
