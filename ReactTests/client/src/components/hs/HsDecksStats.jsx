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
    if (card[2].cost > 6) {
      stats['7+']++;
    } else {
      stats[card[2].cost]++;
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
    return (
      <Card bordered={false}>
        <img
          className="img-hs-Heroes"
          src={`/hearthstone-card-images/rel/${this.props.deck.heroes[1]}.png`}
          alt={this.props.deck.heroes[1]}
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
