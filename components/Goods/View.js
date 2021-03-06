import TimeAgo from 'react-timeago'
import User from '../User.js'

export default (props) => {
  const data = props.data
  return (
<section className='hero is-primary mb-6'>
  <div className='hero-body'>
    <div className='container'>
      <div className='columns'>
        <div className='column is-one-quarter'>
          <User sender={data.sender} key={props.key} />
        </div>
        <div className='column'>
            <h1 className='title'>
              nftaddress
            </h1>
              <h2 className='subtitle'>
                {data.nftaddress }
              </h2>
            <h1 className='title'>
              token_id
            </h1>
              <h2 className='subtitle'>
                {data.token_id }
              </h2>
            <h1 className='title'>
              value
            </h1>
              <h2 className='subtitle'>
                {data.value }
              </h2>
            <h1 className='title'>
              interest_rate_percent
            </h1>
              <h2 className='subtitle'>
                {data.interest_rate_percent }
              </h2>
          <h2 className='subtitle'>
            <TimeAgo date={data.timestamp * 1000} />
          </h2>
        </div>
      </div>
    </div>
  </div>
</section>
)
}