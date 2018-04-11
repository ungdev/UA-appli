import React from 'react';
import { AutoComplete } from 'antd';

// function onSelect(value) {
//   console.log('onSelect', value);
// }

class HsDecks extends React.Component {
  state = {
    dataSource: ['Florent']
  };

  handleSearch = value => {
    this.setState({
      dataSource: !value ? [] : [value, value + value, value + value + value]
    });
  };

  handleChoice = (value, option) => {
    console.log(value, option);
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <h1>Decks Hearthstone</h1>
        <p>Rechercher un deck par nom de joueur</p>
        <AutoComplete
          dataSource={dataSource}
          style={{ width: 200 }}
          onSelect={this.handleChoice}
          onSearch={this.handleSearch}
          placeholder="input here"
        />
      </div>
    );
  }
}

export default HsDecks;
