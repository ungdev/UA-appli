import React from 'react'

class Accueil extends React.Component {
  render() {
    return (
      <div style={{ height: '100%'}} ref={el => (this.instance = el)}>
        <h1>Accueil</h1>
        
        <iframe className="facebook" src="https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2FUTTArena&width=500&height=700&stream=true" />
      </div>
    );
  }
}

export default Accueil
