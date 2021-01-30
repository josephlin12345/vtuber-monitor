import Iframe from './Iframe'

const Players = ({ playerList }) => {
  return (
    <div className='row row-cols-auto'>
      {playerList.map((vid) => (<Iframe key={vid} vid={vid} />))}
    </div>
  )
}

export default Players
