export default (props) => {
  const data = props.data
  return (
    <div className="column is-4">
      <div className="nft-card card is-clickable">
        <div className="card-image">
          <figure className="image is-square">
            <img src={data.image_url} />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img className="is-rounded" src={data.owner?.profile_img_url} />
              </figure>
            </div>
            <div className="media-content">
              <p className="title">{data.owner?.user?.username}</p>
            </div>
          </div>

          <div className="content">
            <p className="title">{data.name}</p>
            <p className="subtitle">{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}


