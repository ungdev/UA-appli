import React from 'react';
import { Card, Tabs } from 'antd';
import HsDecksDeckInfo from './HsDecksDeckInfo';

const TabPane = Tabs.TabPane;

class HsDecksUserUICard extends React.Component {
  render() {
    return (
      <Card
        style={{
          width: '60%'
        }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Deck 1" key="1">
            <HsDecksDeckInfo deckHash={this.props.decks[1]} />
          </TabPane>
          <TabPane tab="Deck 2" key="2">
            <HsDecksDeckInfo deckHash={this.props.decks[2]} />
          </TabPane>
          <TabPane tab="Deck 3" key="3">
            <HsDecksDeckInfo deckHash={this.props.decks[3]} />
          </TabPane>
          <TabPane tab="Deck 4" key="4">
            <HsDecksDeckInfo deckHash={this.props.decks[4]} />
          </TabPane>
          <TabPane tab="Deck 5" key="5">
            <HsDecksDeckInfo deckHash={this.props.decks[5]} />
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}
export default HsDecksUserUICard;
