import NFTProject from '../components/NFTProject.js'

export default (props) => {
  const data = props.data
  console.log(data)
  return (
<section className='hero is-primary mb-6'>
  <div className='hero-body'>
    <div className='container'>
        {data.map((object, i) => <NFTProject data={object} key={i} />)}
    </div>
  </div>
</section>
)
}


