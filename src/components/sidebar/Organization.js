const Organization = ({ image, setOrganization, style }) => {
  return (
    <div className='organization-image-container' onClick={setOrganization} style={style}>
      <img className='organization-image center' src={image} alt='' />
    </div>
  )
}

export default Organization
