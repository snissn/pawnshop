
import Link from 'next/link'
export default (props) => {
  const data = props.data
  var address = data.primary_asset_contracts
  if(address.length == 0){
    return (<></>)
  }
  address = address[0].address
  return (
<section className='is-primary mb-6'>
<div className="tile">
    <Link href={
      {
            pathname: '/mynfts/[slug]/[address]',
            query: { slug:data.slug,address: address },
      }

    } passHref>

    <div className="tile p-5">
        <article className="tile is-child notification is-info">
          <p className="title">{data.name}</p>
          <p className="subtitle">{data.description}</p>
          <figure className="image ">
            <img src={data.large_image_url} />
          </figure>
        </article>
  </div>
    </Link>
    </div>
</section>
)
}

