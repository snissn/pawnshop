import React, { Component } from 'react'
import TimeAgo from 'react-timeago'
import User from '../components/User.js'

import { setupAccounts, w3, contractws } from '../helpers/Web3Helper'

  import ViewGoods from '../components/Goods/View.js'

function zip(arr1, arr2, out = {}) {
  arr1.map((val, idx) => {
    out[val] = arr2[idx]
  })
  return out
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages_Goods_count: 0,
      messages_Goods: null,
    }
  }

  async setUpListeners() {
    var that = this
    contractws.events.allEvents(
      'allEvents',
      {
        fromBlock: 'latest',
      },
      async function (err, data) {
        await that.fetchMessages()
      },
    )
  }

  async componentDidMount() {
    setupAccounts()
    await this.fetchMessages()
    await this.setUpListeners()
  }

  async fetchMessages() {
      var messages_Goods_count = await contractws.methods.get_Goods_list_length().call()
      this.setState({ messages_Goods_count: messages_Goods_count })

      if(messages_Goods_count > 0 ){
        const offset_Goods = messages_Goods_count - 1
        var messages = await contractws.methods.get_last_Goods_N(1, offset_Goods).call()
        this.setState({ messages_Goods: messages[0] })
      }
  }

  render() {
    return (
      <div className="container">
        <nav className="panel is-primary">
          <p className="panel-heading">
              <span className="bd-snippet-tag bd-is-example"><a className="has-text-white" href="/Goods">Goods</a> </span>
              <span className="tag">{this.state.messages_Goods_count}</span>
          </p>
          <div className="panel-block">
          {
            this.state.messages_Goods && (
              <ViewGoods data={ this.state.messages_Goods } />
            )
          }
          </div>
        </nav>
      </div>
    )
  }
}
