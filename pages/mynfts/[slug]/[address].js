import { useRouter } from 'next/router'
import React, { Component, useEffect, useState } from 'react'
import { getNFTs, getProjects, getProject } from '../../../helpers/NFT'
import { setupAccounts, w3, contractws, getMetaMaskAddress } from '../../../helpers/Web3Helper'

import Nft from '../../../components/nft.js'


const mynfts = () => {
  const router = useRouter()
  const { slug, address } = router.query
  const [tokens, setTokens] = useState([]);
  const [project, setProject] = useState({});

  async function setupnfts() {
    var user = await getMetaMaskAddress()
    var _projects = await getNFTs(user, address);
    setTokens(_projects['assets'])
    console.log(_projects);

    var project = await getProject(slug);
    console.log(project)
    setProject(project)
  }

  useEffect(() => {
    if (!address) return;
    setupAccounts()
    setupnfts()

  }, [address])

  return (
    <div className="container">
      <div className="columns">
        {tokens.map((object, i) => <Nft data={object} key={i} />)}
      </div>
    </div>
  )
}

export default mynfts

