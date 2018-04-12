import React from 'react';
import { decode } from 'deckstrings';
import { Avatar, List } from 'antd';
import HearthstoneJSON from 'hearthstonejson-client';
import cardList from './cards.collectible.json';
import HsDecksCardInfoBanner from './HsDecksCardInfoBanner';

class HsDecksDeckInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: decode(this.props.deckHash)
        .cards.map(card => {
          return [cardList.filter(v => v.dbfId == card[0])[0], card[1]];
        })
        .sort((a, b) => {
          return a[0].cost - b[0].cost;
        })
    };
  }

  render() {
    console.log(this.state.deck);
    return (
      <List
        size="small"
        itemLayout="vertical"
        dataSource={this.state.deck}
        renderItem={item => (
          <List.Item>
            <HsDecksCardInfoBanner card={item} />
          </List.Item>
        )}
      />
    );
  }
}
export default HsDecksDeckInfo;
