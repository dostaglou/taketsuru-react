import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { AUTH_TOKEN } from '../../constants'
import { loader } from 'graphql.macro'
import { withApollo } from 'react-apollo'

const loginMutation = loader('../../graphql/mutations/login.gql')

class Login extends Component {
  state = {
    login: true,
    email: '',
    password: '',
    role: 'shipper',
  }

  render() {
    const { login, email, password } = this.state

    return (
        <Form className="card p-2">
          <h4 className="mx-auto my-2">{login ? 'Login' : 'Sign Up' }</h4>
          <div className="input-group p-1">
            <div className="input-group-prepend w-25">
              <span className="input-group-text w-100" placeholder="email" aria-label="email">email</span>
            </div>
            <input
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              type="email"
              className="form-control"
            />
          </div>
          <div className="input-group p-1">
            <div className="input-group-prepend w-25">
              <span className="input-group-text w-100" placeholder="password" aria-label="password">password</span>
            </div>
            <input
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
              type="password"
              className="form-control"
            />
          </div>
          <Button onClick={this._submit}>
            "submit"
          </Button>
        </Form>
    )
  }

  _submit = async () => {
    const result = await this.props.client.mutate({
      mutation: loginMutation,
      variables: {
        loginInformations: {
          role: "shipper",
          email: this.state.email,
          password: this.state.password
        }
      }
    })
    if (result) {
      const loginToken = result.data.authenticateUser.loginToken
      this.props.confirmation(AUTH_TOKEN, loginToken)
      this.props.history.push('/shipments')
    }
  }
}

export default withApollo(Login)
