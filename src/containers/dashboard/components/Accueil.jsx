import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

class Accueil extends React.Component {
  render() {
    return (
      <div style={{ height: '100%'}}>
        <h1>Accueil</h1>
        
        <h2>Derniers posts</h2>

        <div className="social-embed">
          <div>
            <iframe title="Facebook UTTArena" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FUTTArena&tabs=timeline&width=500&height=700&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId" width="500" height="700" scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media" style={{ border: 'none', overflow: 'hidden'}}></iframe>
          </div>

          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="uttarena"
            lang="fr"
            noFooter={true}
            options={{height: 700, width: 500 }} />
        </div>
      </div>
    );
  }
}

export default Accueil
