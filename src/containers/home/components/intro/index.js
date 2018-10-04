import React from 'react'

import './intro.css'

import logo from '../../../../assets/ua2018.png'
import csgo from '../../../../assets/csgo.jpg'
import hearthstone from '../../../../assets/hearthstone.jpg'
import lol from '../../../../assets/lol.jpg'
import pubg from '../../../../assets/pubg.jpg'
import smbu from '../../../../assets/smbu.jpg'
import bg from '../../../../assets/bg_image.png'

const Intro = props => {
  const imgs = [bg].map(img => ({
    backgroundImage: `url(${img})`
  }))


  return (
    <div className="a-intro">
      <div className="a-intro__shadow" />
      <div className="a-intro__images" style={imgs[0]}>
        <div className="a-intro__images__image"  />
      </div>
    </div>
  )
}

export default Intro
