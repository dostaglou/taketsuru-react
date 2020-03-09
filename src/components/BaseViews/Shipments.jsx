import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { loader } from 'graphql.macro'
import ShipmentListItem from '../Shipment/shipmentListItem'

const fetchShipments = loader('../../graphql/queries/fetchShipmentList.gql')

class Shipments extends Component {
  state = {
    shipments: [],
  }

  componentDidMount() {
    this._fetchInitialData()
  }

  render() {
    if(this.state.shipments){
      return (
        <div className="w-75 mx-auto">
          {this.state.shipments.map((shipment, index) => {
              return (
                <ShipmentListItem key={index} shipment={shipment}/>
              )
          })}
        </div>
      )
    }
    return (
      <div>
        One moment as data is fetched
      </div>
    )
  }
  _fetchInitialData = async () => {
    const result = await this.props.client.query({
      query: fetchShipments,
      variables: {
        shipmentArgs: {}
      }
    })
    const shipments = result.data.shipments

    this.setState({shipments: shipments})
  }
}

export default withApollo(Shipments)
