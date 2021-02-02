const Player = ({ vid, width, height }) => {
  return (
    <iframe
      className='player'
      title='player'
      src={`https://www.youtube.com/embed/${vid}?enablejsapi=1&modestbranding=1&iv_load_policy=3`}
      width={width}
      height={height}
    />
  )
}

export default Player
