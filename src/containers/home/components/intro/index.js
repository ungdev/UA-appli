import React from 'react'

import './intro.css'

import logo from '../../../../assets/ua2018.png'
import csgo from '../../../../assets/csgo.jpg'
import hearthstone from '../../../../assets/hearthstone.jpg'
import lol from '../../../../assets/lol.jpg'
import pubg from '../../../../assets/pubg.jpg'
import smbu from '../../../../assets/smbu.jpg'

const Intro = props => {
  const imgs = [hearthstone, pubg, csgo, lol, smbu].map(img => ({
    backgroundImage: `url(${img})`
  }))

  imgs[1].backgroundPosition = 'right'

  return (
    <div className="a-intro">
      <div className="a-intro__shadow" />
      <div className="a-intro__images">
        <div className="a-intro__images__image" style={imgs[0]} />
        <div className="a-intro__images__image" style={imgs[1]} />
        <div className="a-intro__images__image" style={imgs[2]} />
        <div className="a-intro__images__image" style={imgs[3]} />
        <div className="a-intro__images__image" style={imgs[4]} />
      </div>
      <div className="a-intro__logo">
        <img src={logo} height="515" width="370" alt="UTT ARENA 2018" />
      </div>
    </div>
  )
}

export default Intro
