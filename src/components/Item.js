import Image from './Image'

const Item = ({ info, onClick, playing }) => {
  const title = `${info.channel.name} - ${info.title}`;
  return (
    <div className='btn' onClick={() => onClick(info.yt_video_key)}>
      <Image src={info.channel.photo} title={title} playing={playing} />
    </div>
  )
}

export default Item
