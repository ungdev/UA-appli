import React from 'react'

import './intro.css'

import LoginForm from '../loginForm'

import csgo from '../../../../assets/csgo.jpg'
import hearthstone from '../../../../assets/hs.jpg'
import lol from '../../../../assets/lol.jpg'
import fortnite from '../../../../assets/fortnite.jpg'
import smbu from '../../../../assets/smbu.jpg'

const Intro = props => {
  const imgs = [smbu, lol, csgo, fortnite, hearthstone].map(img => ({
    backgroundImage: `url(${img})`,
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
      <div className="a-intro__login">
        <LoginForm />
      </div>
    </div>
  )
}

export default Intro
