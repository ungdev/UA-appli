import React from "react"
import { connect } from "react-redux"
import { Input, Button } from 'antd'
import { autoLogin } from '../../../modules/login'
import { setPlaces } from '../../../modules/admin'

class SetPlaces extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      textareaValue: ''
    }

    this.props.autoLogin()
  }

  textareaChanged = (e) => {
    this.setState({
      textareaValue: e.target.value
    })
  }

  send = () => {
    // Parse places
    const placesText = this.state.textareaValue
    const rows = placesText.split('\n')
    const users = rows.map(row => row.split(','))
    const places = users.map(user => {
      return { id: user[0], tableLetter: user[3], placeNumber: user[4] }
    })

    this.props.setPlaces(places)

    this.setState({
      textareaValue: ''
    })
  }

  render() {
    return (
      <div>
        <Input.TextArea
          placeholder="Places (format CSV)"
          onChange={this.textareaChanged}
          value={this.state.textareaValue}
        />

        <Button
          type="primary"
          onClick={this.send}
        >
          Envoyer
        </Button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(autoLogin()),
  setPlaces: (places) => dispatch(setPlaces(places))
})

export default connect(
  null,
  mapDispatchToProps
)(SetPlaces)
