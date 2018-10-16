import React from 'react'

import './intro.css'

import LoginForm from '../loginForm'

import logo from '../../../../assets/ua2018.png'
import csgo from '../../../../assets/csgo.jpg'
import hearthstone from '../../../../assets/hs.jpg'
import lol from '../../../../assets/lol.jpg'
import fortnite from '../../../../assets/fortnite.jpg'
import smbu from '../../../../assets/smbu.jpg'

const Intro = props => {
  const imgs = [lol, smbu, csgo, fortnite, hearthstone].map(img => ({
    backgroundImage: `url(${img})`,
    //backgroundPosition: 'center 15%'
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
        {/* <img src={logo} height="515" width="370" alt="UTT ARENA 2018" /> */}
        <LoginForm />
      </div>
    </div>
  )
}

export default Intro
