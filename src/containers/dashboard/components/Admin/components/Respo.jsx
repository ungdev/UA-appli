import React from 'react'
import { connect } from 'react-redux'
import { Checkbox } from 'antd'

import '../admin.css'

class Respo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      checkedRespo: this.props.defaultCheckedRespo || []
    }
  }

  onChange = (checkedRespo) => {
    this.setState({
      checkedRespo
    })

    this.props.checkedRespo(checkedRespo)
  }

  render() {
    const spotlights = [
      {
        name: 'LoL (pro)',
        id: '1'
      },
      {
        name: 'LoL (amateur)',
        id: '2'
      },
      {
        name: 'Fortnite',
        id: '3'
      },
      {
        name: 'CS:GO',
        id: '4'
      },
      {
        name: 'Hearthstone',
        id: '5'
      },
      {
        name: 'SSBU',
        id: '6'
      },
      {
        name: 'Libre',
        id: '7'
      }
    ]

    return (
      <Checkbox.Group onChange={this.onChange} defaultValue={this.state.checkedRespo}>
        {
          spotlights.map(spotlight => {
            return (
              <React.Fragment key={spotlight.id}>
                <Checkbox value={spotlight.id}>Tournoi {spotlight.name}</Checkbox>
                <br />
              </React.Fragment>
            )
          })
        }
      </Checkbox.Group>
    )
  }
}

export default connect(
  null,
  null
)(Respo)