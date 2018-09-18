import React from 'react'

import './social.css'

import discord from '../../../../assets/discord.svg'
import facebook from '../../../../assets/facebook.svg'
import youtube from '../../../../assets/youtube.svg'

const Social = () => {
  const d = { backgroundImage: `url(${discord})` }
  const f = { backgroundImage: `url(${facebook})` }
  const y = { backgroundImage: `url(${youtube}` }

  return (
    <div className="a-social">
      <a target="_blank" href={process.env.REACT_APP_DISCORD} className="a-social__icon" style={d}>
        &nbsp;
      </a>
      <a target="_blank" href={process.env.REACT_APP_DISCORD} className="a-social__icon" style={f}>
        &nbsp;
      </a>
      <a target="_blank" href={process.env.REACT_APP_YOUTUBE} className="a-social__icon" style={y}>
        &nbsp;
      </a>
    </div>
  )
}

export default Social
