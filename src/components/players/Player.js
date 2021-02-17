import ReactPlayer from 'react-player'

const Player = ({ url, width, height }) => {
  return (
    <ReactPlayer
      controls={true}
      url={url}
      width={width}
      height={height}
      config={{ youtube: { playerVars: { origin: window.location.origin } } }}
    />
  )
}

export default Player
