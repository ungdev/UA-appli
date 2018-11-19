import React from 'react';
import { Card, List, Progress, Tag } from 'antd';

const maxCalculator = stats => {
  let max = 0;
  Object.entries(stats).forEach(value => {
    if (value[1] > max) {
      max = value[1];
    }
  });
  return max;
};
const statMaker = deck => {
  let stats = {
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7+': 0
  };
  deck.cards.forEach(card => {
    if (card.cost > 6) {
      stats['7+']++;
    } else {
      stats[card.cost]++;
    }
  });
  return stats;
};

class HsDecksStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: statMaker(this.props.deck)
    };
  }

  render() {
    const { hero } = this.props.deck
    return (
      <Card bordered={false} style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={`http://media.services.zam.com/v1/media/byName/hs/cards/enus/animated/${hero.id}_premium.gif`}
          alt={hero.name}
          width={204}
          height={310}
        />
        <List size="small" bordered={false} header={<div>Courbe de Mana</div>}>
          {Object.entries(this.state.stats).map((entry, key) => {
            return (
              <List.Item key={key}>
                <Tag color="#2db7f5">{entry[0]}</Tag>
                <Progress
                  percent={entry[1] / maxCalculator(this.state.stats) * 100}
                  size="small"
                  status="active"
                  format={() => {
                    return `x${entry[1]}`;
                  }}
                />
              </List.Item>
            );
          })}
        </List>
      </Card>
    );
  }
}
export default HsDecksStats;
