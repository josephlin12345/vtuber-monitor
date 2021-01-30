const Iframe = ({ vid }) => {
  const src = `https://www.youtube.com/embed/${vid}?enablejsapi=1&modestbranding=1&iv_load_policy=3`
  return (
    <div className='col m-1'>
      <iframe title='youtube player' src={src}></iframe>
    </div>
  )
}

export default Iframe
