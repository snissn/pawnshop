import React, { useState, useEffect } from 'react'
import { auth } from '../../lib/db'
import ImageUpload from '../ImageUpload.js'

import { contract, w3 } from '../../helpers/Web3Helper'

export default function Send() {

    const [nftaddress, setnftaddress] = useState() 
  
    const [token_id, settoken_id] = useState() 
  
    const [value, setvalue] = useState() 
  
    const [interest_rate_percent, setinterest_rate_percent] = useState() 
  

  const [errorMessage, setErrorMessage] = useState()
  const [sendStatus, setSendStatus] = useState()
  const [user, setUser] = useState(false)

  useEffect(() => {    
    fetch(`${process.env.REACT_APP_GOOGLE_AUTH_DOMAIN}/check-auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      withCredentials: true,
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        const { auth, message, user } = JSON.parse(data);
        setUser(user);
        console.log(message);
      });
  }, [])

  const mySubmitHandler = async (event) => {
    event.preventDefault()
    let fail = false;
    if (nftaddress === '') {
      setErrorMessage('Your nftaddress cannot be empty')
      fail = true;
    } 
    if(fail){

    }
    else {
      setSendStatus('Sending')
      contract.methods
        .new_Goods(nftaddress,token_id,value,interest_rate_percent) 
        .estimateGas()
        .then((gasEstimate) => {
          contract.methods
            .new_Goods(nftaddress,token_id,value,interest_rate_percent) 
            .send({ gas: gasEstimate  })
            .then(() => {
              setSendStatus('')
                  setnftaddress("")
                  settoken_id("")
                  setvalue("")
                  setinterest_rate_percent("")
            })
        })
    }
  }
  if (user) {
    return (
      <form className="p-6" onSubmit={mySubmitHandler}>




        <div className="field">
          <label className="label">nftaddress</label>
          <div className="control">
            <input className="input" type="text" placeholder="Type your nftaddress here..."
              name="nftaddress"
              value={ nftaddress    }
              onChange={(event) => setnftaddress(event.target.value)}
            />
          </div>
        </div>



        <div className="field">
          <label className="label">token_id</label>
          <div className="control">
            <input className="input" type="text" placeholder="Type your token_id here..."
              name="token_id"
              value={ token_id    }
              onChange={(event) => settoken_id(event.target.value)}
            />
          </div>
        </div>



        <div className="field">
          <label className="label">value</label>
          <div className="control">
            <input className="input" type="text" placeholder="Type your value here..."
              name="value"
              value={ value    }
              onChange={(event) => setvalue(event.target.value)}
            />
          </div>
        </div>



        <div className="field">
          <label className="label">interest_rate_percent</label>
          <div className="control">
            <input className="input" type="text" placeholder="Type your interest_rate_percent here..."
              name="interest_rate_percent"
              value={ interest_rate_percent    }
              onChange={(event) => setinterest_rate_percent(event.target.value)}
            />
          </div>
        </div>


<div className="field is-grouped">
  <div className="control">
    <input  className={
                sendStatus === 'Sending'
                  ? 'button is-info is-bold'
                  : 'button is-warning has-text-white is-bold'
              }
              type="submit"
              value={sendStatus === 'Sending' ? 'Sharing...' : 'Share'}
              />
  </div>
</div>


      </form>
    )
  } else {
    return (
      <section className="hero is-warning mb-6">
        <div className="hero-body">
          <div className="container">
            <h3 className="title has-text-centered is-5">Please sign in to create a Goods</h3>
          </div>
        </div>
      </section>
    )
  }
}
