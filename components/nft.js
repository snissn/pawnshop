export default (props) => {
  const data = props.data
  return (
<section className='is-primary mb-6'>
<div className="tile">
    <div className="tile p-5">
        <article className="tile is-child notification is-info">
          <p className="title">{data.name}</p>
          <p className="subtitle">{data.description}</p>
          <figure className="image ">
            <img src={data.image_url} />
          </figure>
        </article>
  </div>
    </div>
</section>
)
}


