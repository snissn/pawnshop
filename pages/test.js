import React, { Component, useEffect, useState } from 'react'

import { setupAccounts } from '../helpers/Web3Helper'

export default (props) => {
  useEffect(() => {
    setupAccounts()
  }, [])

  return (
    <div className="container">
    HI
    </div>
  )
}

