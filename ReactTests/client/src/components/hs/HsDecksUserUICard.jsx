import React from 'react';
import { Card, Tabs } from 'antd';
import { decode } from 'deckstrings';
import cardList from './cards.json';
import HsDecksDeckList from './HsDecksDeckList';
import HsDecksStats from './HsDecksStats';

const TabPane = Tabs.TabPane;

const deckDecoder = hashs => {
  return Object.values(hashs).map(hash => {
    let deck = decode(hash);
    deck.cards = deck.cards
      .map(card => {
        return [card[0], card[1], cardList.filter(v => v.dbfId == card[0])[0]];
      })
      .sort((a, b) => {
        return a[2].cost - b[2].cost;
      });
    deck.heroes = [
      cardList.filter(v => v.dbfId == deck.heroes)[0].name,
      deck.heroes[0]
    ];
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
    console.log(this.state.decks);
    return (
      <Card
        style={{
          width: '100%'
        }}>
        <Tabs defaultActiveKey="0" size="small" tabPosition="left">
          {this.state.decks.map((deck, key) => {
            return (
              <TabPane
                className="cardTab"
                tab={
                  <div className="tabTitle">
                    <div className="tabTitleName">Deck {key + 1}</div>
                    <div className="tabTitleHero">{deck.heroes[0]}</div>
                  </div>
                }
                key={key}>
                <div className="flex-card">
                  <div className="flex-card-left">
                    <HsDecksDeckList deck={deck} />
                  </div>
                  <div className="flex-card-right">
                    <HsDecksStats deck={deck} />
                  </div>
                </div>
              </TabPane>
            );
          })}
        </Tabs>
      </Card>
    );
  }
}
export default HsDecksUserUICard;
