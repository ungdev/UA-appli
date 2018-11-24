import React from 'react'
import Konami from 'react-konami'

import './pizza.css'

class Pizza extends React.Component {
  constructor() {
    super()

    this.state = {
      show: false
    }

    this.trigger = this.trigger.bind(this)
  }

  trigger() {
    this.setState({
      show: true
    })

    setTimeout(
      () =>
        this.setState({
          show: false
        }),
      2000
    )
  }

  render() {
    return (
      <div className="a-pizza">
        <Konami easterEgg={this.trigger} resetDelay={1000} />
        <div className="a-pizza-modal" active={this.state.show.toString()}>
          <h2>Oui, il y aura de la pizza.</h2>
          <img src={`${process.env.PUBLIC_URL}/pizza.svg`} alt="" />
        </div>
      </div>
    )
  }
}

export default Pizza
