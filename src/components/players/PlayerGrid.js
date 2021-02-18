import Player from './Player'
import { useState, useEffect } from 'react'

const PlayerGrid = ({ showNavbar, playerList }) => {
  // calculate size
  const useSize = () => {
    const [size, setSize] = useState([0, 0, 0]);
    useEffect(() => {
      const getSize = () => {
        const length = playerList.length;
        const gridHeight  = showNavbar ? document.body.clientHeight - 100 : document.body.clientHeight - 10;
        const gridWidth = document.body.clientWidth - 10;
        let max = 0;
        let gridColunms = length;
        let playerHeight = 0;
        let playerWidth = 0;

        for(let colunms = length; colunms > 0; colunms--) {
          const rows = Math.ceil(length / colunms);
          const rowBased = gridHeight / rows / 9;
          const colunmBased = gridWidth / colunms / 16;
          const base = rowBased > colunmBased ? colunmBased : rowBased;
          const totalArea = base * 9 * base * 16 * length;

          if(totalArea > max) {
            max = totalArea;
            gridColunms = colunms;
            playerHeight = base * 9;
            playerWidth = base * 16;
          }
        }
        setSize([playerWidth, playerHeight, gridColunms]);
      }
      window.addEventListener('resize', getSize);
      getSize();
      return () => window.removeEventListener('resize', getSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showNavbar, playerList])
    return size;
  }

  const gridHeight = showNavbar ? 'calc(100vh - 100px)' : 'calc(100vh - 10px)';
  const [playerWidth, playerHeight, gridColunms] = useSize();
  return (
    <div className='player-container'
      style={{
        height: gridHeight,
        maxHeight: gridHeight,
        gridTemplateColumns: `repeat(${gridColunms}, 1fr)`
      }}
    >
      {playerList.map(video =>
        <Player
          key={video._id}
          url={video.url}
          height={playerHeight}
          width={playerWidth}
        />
      )}
    </div>
  )
}

export default PlayerGrid
