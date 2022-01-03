import React, { Component, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { setupAccounts, w3, contractws } from '../helpers/Web3Helper'


function zip(arr1, arr2, out = {}) {
  arr1.map((val, idx) => {
    out[val] = arr2[idx]
  })
  return out
}

  import ViewGoods from '../components/Goods/View.js'

export default (props) => {
  const router = useRouter()

  const [address, setAddress] = useState('')



    const [messages_Goods_count, set_messages_Goods_count] = useState(0)
    const [messages_Goods, set_messages_Goods] = useState(null)



  useEffect(() => {
      if(router.query.address){
        setAddress(router.query.address)
      }
    console.log('hi',router.query)
   } )


  async function setUpListeners() {
      contractws.events.allEvents(
        'allEvents',
        {
          fromBlock: 'latest',
        },
        async function (err, data) {
          await fetchMessages()
        },
      )
    }

    async function fetchMessages() {
      if(address == ''){return}
      var messages_Goods_count = await contractws.methods.get_Goods_user_length(address).call()
      set_messages_Goods_count ( messages_Goods_count )

      if(messages_Goods_count > 0 ){
        const offset_Goods = messages_Goods_count - 1
        var messages = await contractws.methods.get_last_Goods_user_N(address,1, offset_Goods).call()
        set_messages_Goods( messages[0])
      }
  }

  useEffect(() => {
     setUpListeners()
  })

  useEffect(() => {
   

  
     fetchMessages()

  },[address])

  return( <div className="container">
    
        <nav className="panel is-primary">
          <p className="panel-heading">
              <span className="bd-snippet-tag bd-is-example"><a className="has-text-white" href="/Goods">Goods</a> </span>
              <span className="tag">{messages_Goods_count}</span>
          </p>
          <div className="panel-block">
          {
            messages_Goods && (
              <ViewGoods data={ messages_Goods } />
            )
          }
          </div>
        </nav>
    
   </div>)
}
