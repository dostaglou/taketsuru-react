import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { Button } from 'react-bootstrap'


class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <div className="d-flex center-text">
          <div>
            <h3>Welcome to Shippio Inc.</h3>
            <p>Revolutionizing the shipment forwarding industry in Japan and the world</p>
            <p>To learn how we can help your business, please log in / sign up</p>
          </div>
        </div>
        <div className="d-flex justify-content-around">
          <Button className="w-50" href="/login">
            Login
          </Button>
        </div>
      </div>
    )
  }
}

export default withApollo(MainPage)
