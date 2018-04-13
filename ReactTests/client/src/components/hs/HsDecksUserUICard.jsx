import React from 'react';
import { Card, Divider, Tabs } from 'antd';
import HsDecksDeckInfo from './HsDecksDeckInfo';
import { decode } from 'deckstrings';
import cardList from './cards.json';

const TabPane = Tabs.TabPane;

const deckDecoder = hashs => {
  return Object.values(hashs).map(hash => {
    let deck = decode(hash);
    deck.cards = deck.cards
      .map(card => {
        return [cardList.filter(v => v.dbfId == card[0])[0], card[1]];
      })
      .sort((a, b) => {
        return a[0].cost - b[0].cost;
      });
    deck.heroes = cardList.filter(v => v.dbfId == deck.heroes)[0].name;
    return deck;
  });
};

class HsDecksUserUICard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: deckDecoder(this.props.deckHashs)
    };
  }

  render() {
    return (
      <Card
        style={{
          width: '60%'
        }}>
        <Tabs defaultActiveKey="0" size="small" tabPosition="left">
          {this.state.decks.map((deck, key) => {
            return (
              <TabPane
                tab={
                  <div className="tabTitle">
                    <div className="tabTitleName">Deck {key + 1}</div>
                    <div className="tabTitleHero">{deck.heroes}</div>
                  </div>
                }
                key={key}>
                <HsDecksDeckInfo deck={deck} />
              </TabPane>
            );
          })}
        </Tabs>
      </Card>
    );
  }
}
export default HsDecksUserUICard;
