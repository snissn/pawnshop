import React, { Component, useEffect, useState } from 'react'
import NFTProjects from '../components/NFTProjects.js'

import { getNFTs, getProjects } from '../helpers/NFT'
import { setupAccounts, w3, contractws, getMetaMaskAddress } from '../helpers/Web3Helper'
export default (props) => {
  const [projects, setProjects] = useState([]);

  async function setupnfts() {
    var address = await getMetaMaskAddress()
    console.log(address);
    var _projects = await getProjects(address);
    setProjects(_projects)
  }
  useEffect(() => {
    setupAccounts()
    setupnfts()

  }, [])

  return (
    <div className="container">
      <NFTProjects data={projects} />
    </div>
  )
}

