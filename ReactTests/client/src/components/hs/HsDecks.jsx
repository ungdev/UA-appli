import React from 'react';
import { AutoComplete, Button, Collapse, Divider, Icon, Input } from 'antd';
import HsDecksUserUICard from './HsDecksUserUICard';
import GameStatusBar from '../GameStatusBar/GameStatusBar';

const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;

const db = [
  {
    username: 'Flo',
    decks: {
      0: 'AAEBAR8GgAfFCKirAoW4AunSAobTAgyNAagCtQPJBJcI2wn+DPixAt3SAt/SAuPSAuHjAgA=',
      1: 'AAEBAa0GBqIJpQmoqwKFuALCzgKQ0wIM0wrXCqGsAre7Aui/Auq/AtHBAuXMAubMArTOAujQAuPpAgA=',
      2: 'AAEBAf0GBMrDAsLOApfTApziAg0w9wTyBc4Hwgi0rAK8tgKXwQKfwgLrwgKbywL3zQLy0AIA',
      3: 'AAEBAa0GAtYKqrICDvgC5QSNCNEK8gyCtQK1uwK6uwLwuwLRwQLYwQLOzALL5gL86gIA',
      4: 'AAEBAf0GBsQIzAjgrAKgzgKX0wLY5wIMigHbBrYHm8IC3sQC58sCrs0C8tAC+NACiNIC/OUC6OcCAA=='
    }
  },
  {
    username: 'FloFlo',
    decks: {
      0: 'AAEBAf0GBOCsApfTAp3iAtvpAg2KAZME9wS2B+EH3sQC58sC8tAC+NACiNICi+EC/OUC6OcCAA==',
      1: 'AAEBAZ8FBPIFrwe5wQLW5QINxQPbA6cFpwixCNOqAtmuAtO8ArPBAp3CArHCAuPLAvjSAgA=',
      2: 'AAEBAZ8FBvQFucECg8cC1uUCteYCt+cCDKcF9QXZB7EI2a4Cu68C/68CuMcC2ccC48sC+NICieYCAA==',
      3: 'AAEBAf0EBsABqwS/CKO2Atm7AqLTAgxxuwKVA+YElgXsBde2Auu6Aoe9AsHBApjEAo/TAgA=',
      4: 'AAEBAa0GAuG/AtDnAg4IjQjyDIK1Arq7AvC7AtnBAsrDApnIAsrLAs7MAsvmAvzqAtfrAgA='
    }
  }
];

class HsDecks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: db.map(user => {
        return user.username;
      }),
      dataToShow: db
    };
  }

  onSelect(value) {}

  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <GameStatusBar game="hearthstone" />
        <Divider />
        <h1>Decks Hearthstone</h1>
        <p>Rechercher un deck par nom de joueur</p>
        <AutoComplete
          className="global-search"
          style={{ width: 200 }}
          dataSource={dataSource}
          placeholder="Pseudo de joueur"
          filterOption={(inputValue, option) =>
            option.props.children
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          }
          onSelect={value => {
            this.setState({
              dataToShow: db.filter(user => user.username == value)
            });
          }}
        />
        <Button
          icon="reload"
          onClick={e => {
            this.setState({ dataToShow: db });
          }}
        />
        <Collapse accordion>
          {this.state.dataToShow.map((user, key) => {
            return (
              <Panel header={user.username} key={key}>
                <HsDecksUserUICard deckHashs={user.decks} />
              </Panel>
            );
          })}
        </Collapse>
      </div>
    );
  }
}

export default HsDecks;
