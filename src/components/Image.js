const Image = ({ src, title, playing }) => {
  return (
    <img src={src} alt='' title={title} width='70'
      className={playing ? 'rounded-circle border border-warning border-3' : 'rounded-circle border border-dark border-2'}
    />
  )
}

export default Image
