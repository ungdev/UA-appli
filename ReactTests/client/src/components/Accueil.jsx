import React from 'react';
import NotPrepared from '../notprepared.jpg';

class Accueil extends React.Component {
  render() {
    return (
      <div>
        <h1>Accueil</h1>
        <img src={NotPrepared} alt='not prepared' />
      </div>
    );
  }
}

export default Accueil;
