import React from "react"
import { connect } from "react-redux"

import { Form, Icon, Input, Button, Checkbox } from "antd"
// import Button from '../../../../components/button'

import { register } from "../../../../modules/register"
import { tryLogin } from "../../../../modules/login"
import { fetchUser } from "../../../../modules/user"

import "./loginForm.css"

const FormItem = Form.Item

class LoginForm extends React.Component {
  constructor() {
    super()

    this.state = {
      tabIndex: 0,
      loading: false
    }

    this.setTabIndex = this.setTabIndex.bind(this)
    this.submit = this.submit.bind(this)
  }

  setTabIndex(tabIndex) {
    this.setState({
      tabIndex
    })
  }

  submit(user) {
    this.setState({
      loading: true
    })

    this.props
      .register(user)
      .then(() => this.setState({ loading: false, tabIndex: 0 }))
  }

  render() {
    const { getFieldDecorator } = this.props.form
    console.log(this.props.login)
    return (
      <Form onSubmit={this.props.login} className="login-form">
        <FormItem>
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Veuillez saisir votre nom d'utilisateur"
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Nom d'utilisateur"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "Veuillez saisir votre mot de passe" }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Mot de passe"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  canLogin: state.canLogin.canLogin
})

const mapDispatchToProps = dispatch => ({
  login: user => {
    dispatch(tryLogin(user)).then(() => {
      dispatch(fetchUser())
    })
  },
  register: user => dispatch(register(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(LoginForm))
