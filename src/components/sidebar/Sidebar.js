import { IoMenuOutline, IoClose } from 'react-icons/io5'
import { useState } from 'react'
import Organization from './Organization'

const Sidebar = ({ organizationsInfo, currentOrganization, setCurrentOrganization }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [current] = organizationsInfo.filter(organization => organization.name === currentOrganization);
  return (
    <>
      {showSidebar &&
        <div className='sidebar'>
          <div className='main-sidebar'>
            <IoClose className='sidebar-icon tool-icon' onClick={() => setShowSidebar(!showSidebar)} />
            <img className='current' src={current.image} alt='' />
          </div>
          {organizationsInfo.map(organization => (
            <Organization
              key={organization.name}
              image={organization.image}
              setOrganization={() => setCurrentOrganization(organization.name)}
            />
          ))}
        </div>
      }
      <IoMenuOutline className='sidebar-icon tool-icon' onClick={() => setShowSidebar(!showSidebar)} />
    </>
  )
}

export default Sidebar
