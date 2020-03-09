import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { loader } from 'graphql.macro'
import { Card, Figure, Button } from 'react-bootstrap'

const currentShipperProfile = loader('../../graphql/queries/fetchCurrentShipper.gql')

class Profile extends Component {
  state = {
    shipper: {},
    name: '',
    email: '',
    phoneNumber: '',
    language: '',
  }
  componentDidMount() {
    this._fetchInitialData()
  }

  render() {
    const { shipper } = this.state
    return (
      <Card className="">
      <Figure.Image
        src="https://via.placeholder.com/100"
        width={100}
        height={100}
        roundedCircle={true}
        className="my-2 mx-auto"
      />
      <Card.Body>
        <Button className="btn btn-success w-100 btn-sm mb-2">Edit</Button>
        <div>
          <div className="d-flex justify-content-between">
            <div>Name:</div><div>{shipper.name}</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>Email:</div><div>{shipper.email}</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>Phone Number:</div><div>{shipper.phoneNumber}</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>Language:</div><div>{shipper.language}</div>
          </div>
        </div>
      </Card.Body>
    </Card>
    )
  }

  _fetchInitialData = async () => {
    const result = await this.props.client.query({
      query: currentShipperProfile
    })
    const shipper = result.data.shipper;
    this.setState({
      shipper: shipper
    })
  }
}

export default withApollo(Profile)
