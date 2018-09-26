import React from 'react'
import NotPrepared from '../assets/notprepared.jpg'

class Accueil extends React.Component {
  render() {
    return (
      <div style={{ height: '100%'}}>
        <h1>Accueil</h1>
        <div style={{ textAlign: 'center', height: '100%' }}><img src={NotPrepared} alt='not prepared' /></div>
      </div>
    );
  }
}

export default Accueil
