import ReactPlayer from 'react-player'

const Player = ({ url, width, height }) => {
  return (
    <ReactPlayer controls={true} url={url + `&origin=${window.location.host}`} width={width} height={height} />
  )
}

export default Player
