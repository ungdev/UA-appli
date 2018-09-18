import React from 'react'

import './partners.css'

class Partners extends React.Component {
  render() {
    let id = 1
    const partners = process.env.REACT_APP_PARTNERS.split(',').map(partner => ({
      key: id++,
      name: partner,
      image: `${process.env.PUBLIC_URL}/${partner}.png`,
      url: process.env[`REACT_APP_PARTNER_${partner.toUpperCase()}_LINK`]
    }))
    return (
      <div className="a-partners">
        <h2 className="a-partners__partner">PARTENAIRES</h2>
        <div className="a-partners_logos">
          {partners.map((partner, i) =>
            
            <a
              key={i}
              className="a-partners__images"
              href={partner.url}
            >
              <img src={partner.image} key={i} alt={partner.name} />
            </a>
          )}
        </div>
        <a className="a-partners__link" href="mailto:arena@utt.fr">Devenir partenaire</a>
      </div>
    )
  }
}

export default Partners
