import NFTProject from '../components/NFTProject.js'

export default (props) => {
  const data = props.data
  return (
    <div className="columns">
      {data.map((object, i) => <NFTProject data={object} key={i} />)}
    </div>
  )
}


