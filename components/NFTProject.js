
import Link from 'next/link'
export default (props) => {
  const data = props.data
  var address = data.primary_asset_contracts
  if (address.length == 0) {
    return (<></>)
  }
  address = address[0].address
  return (
    <div className="column is-4">
      <div className="nft-card card is-clickable">
        <Link href={
          {
            pathname: '/mynfts/[slug]/[address]',
            query: { slug: data.slug, address: address },
          }

        } passHref>
          <div>
            <div className="card-image">
              <figure className="image is-square">
                <img src={data.large_image_url} />
              </figure>
            </div>
            <div className="card-content">
              <div className="content">
                <p className="title">{data.name}</p>
                <p className="subtitle">{data.description}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

