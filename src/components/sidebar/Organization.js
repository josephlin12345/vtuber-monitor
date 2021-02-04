const Organization = ({ image, setOrganization }) => {
  return (
    <img className='organization-image' src={image} alt='' onClick={setOrganization} />
  )
}

export default Organization
