import React, { Component } from 'react'
import { Button,Card, Dialog, Tag, Form, Input } from 'element-react'
import 'element-theme-default'
import { loader } from 'graphql.macro'
import { withApollo } from 'react-apollo'
import AssignStaff from './assignStaff'
import Milestones from './milestones'

const mutationFollowShipment = loader('../../graphql/mutations/followShipment.gql')
const mutationUnfollowShipment = loader('../../graphql/mutations/unfollowShipment.gql')
const queryMessages = loader('../../graphql/queries/fetchChannelMessages.gql')
const mutationCreateChannelMessage = loader('../../graphql/mutations/createChannelMessage.gql')
// const subscription = loader('../../graphql/subscriptions/channelMessageCreated.gql')

class ShipmentListItem extends Component {
  state = {
    shipment: {...this.props.shipment},
    messages: [],
    dialogVisible: false,
    form: {
      desc: ''
    }
  }

  componentDidMount(){
    // this._handleSubscription()
  }

  render() {
    const { shipment } = this.state
    return (
      <Card className="px-2 my-2 bg-light">
        <div className="w-100 border-bottom">
          <div className="mb-2 d-flex justify-content-around">
            <Tag className="w-25 m-1 text-center"  type="warning">{this._customerRole(shipment.customerRole)}</Tag>
            <Tag className="w-25 m-1 align-center text-center" type="secondary">{this._incoterm(shipment.incoterm)}</Tag>
            <Tag className="w-25 m-1 text-center" type="success">{this._cargoType(shipment.cargoType)}</Tag>
          </div>
          <h5 className="mx-auto py-2 text-center border-top border-bottom">{shipment.reference}</h5>
          <div className="d-flex justify-content-between my-1">
            <span className="mx-1 text-info">{shipment.departurePlace.name}</span>
            <i className="material-icons align-bottom">chevron_right</i>
            <span className="mx-1 text-success">{shipment.arrivalPlace.name}</span>
          </div>
          <p className="my-1 text-center">
            {shipment.cargoDescription.description}
          </p>
        </div>
        <Milestones milestones={shipment.milestones} />
        <div className="pt-2 d-flex justify-content-around">
          <AssignStaff shipmentId={shipment.id} assignedCustomer={shipment.assignedCustomer} />
          <i onClick={this._mutateToggleFollowShipment} className="material-icons align-bottom">{this._followIcon(shipment.followed)}</i>
          <i className="material-icons align-bottom">view_list</i>
          <i onClick={this._openChat} className="material-icons align-bottom">chat</i>
          <i className="material-icons align-bottom">content_copy</i>
          <Dialog
            title={`For ${shipment.reference} from ${shipment.departurePlace.name} to ${shipment.arrivalPlace.name}`}
            className={'bg-light overflow-auto h-50'}
            size={'large'}
            visible={ this.state.dialogVisible }
            onCancel={ () => this.setState({dialogVisible: false})} >
              <Dialog.Body>
                  {
                    this.state.messages.map((message, index) => {
                      return (
                        <div className="d-flex w-100 " key={index}>
                          <div style={{width: "15%", minWidth: "40px"}} className="bg-light">{message.sender.senderType === "shipper" ? message.sender.name : null}</div>
                          <div className="bg-white py-2 flex-grow-1 border-bottom">{message.content}.</div>
                          <div style={{width: "15%", minWidth: "40px"}} className="bg-light">{message.sender.senderType === "operator" ? message.sender.name : null}</div>
                        </div>
                      )
                    })
                  }
                <Form>
                  <Form.Item label="create msg">
                    <Input type="textarea" value={this.state.form.desc} onChange={this._msgInput}/>
                  </Form.Item>
                  <Button className="w-100" type="primary" nativeType="submit" onClick={this._handleSubmit}>Submit</Button>
                  <Button className="w-100 ml-0 mt-2" type="warning" nativeType="submit" onClick={this._handleReset.bind(this)}>Clear & Cancel</Button>
                </Form>
              </Dialog.Body>
          </Dialog>
        </div>
      </Card>
    )
  }

  _handleSubscription = async () => {
    // const result = await this.props.client.subscribe({
    //   subscription: subscription,
    //   variables: {
    //     shipmentId: this.state.shipment.id
    //   }
    // })
    // console.log(result)
  }

  _handleSubmit = async (e) => {
    e.preventDefault()
    const channelId = this.state.shipment.channelList[0].id
    const msg = this.state.form.desc
    const result = await this.props.client.mutate({
      mutation: mutationCreateChannelMessage,
      variables: {
        message: {
          content: msg,
          communicationType: "text"
        },
        channelId: channelId,
      }
    })

    if (result) {
      this._fetchMessages(channelId)
      this.setState(prevState => {
        prevState.form.desc = ''
        return {prevState}
      })
    }
  }

  _handleReset = (e) => {
    e.preventDefault()
    this.setState(prevState => {
      prevState.form.desc = ''
      prevState.dialogVisible = false
      return {prevState}
    })
  }
  _msgInput = (e) => {
    this.setState(prevState => {
      prevState.form.desc = e
      return {prevState}
    })
  }

  _openChat = () => {
    if (this.state.shipment.channelList){
      const channelId = this.state.shipment.channelList[0].id
      this._fetchMessages(channelId)
    }
  }

  _fetchMessages = async (channelId) => {
    const result = await this.props.client.query({
      query: queryMessages,
      fetchPolicy: 'no-cache',
      variables: {
        shipmentArgs: {
          shipmentId: this.state.shipment.id
        },
        channelId: channelId,
        pagination: {
          page: 1,
          per: 9999
        }
      }
    })
    if (result){
      const messages = result.data.shipments[0].channelList[0].channelMessages
      console.log(messages)
      this.setState(prevState => {
        prevState.messages = messages.reverse()
        prevState.dialogVisible = true
        return (prevState)
      })
      console.log(this.state.messages)
    }
  }

  _followIcon = (followed) => {
    if (followed === true) {
      return "bookmark"
    }
    return "bookmark_border"
  }

  _customerRole = (role) => {
    if (role === "seller"){
      return "Export"
    }
    return "Import"
  }

  _incoterm = (term) => {
    if (term === undefined) {
      return "Any"
    }
    return term
  }

  _cargoType = (type) => {
    if (type === "FCL") {
      return type
    }
    return "LCL"
  }

  _mutateToggleFollowShipment = async () => {
    const previousState = this.state.shipment.followed

    const result = await this.props.client.mutate({
      mutation: previousState ? mutationUnfollowShipment : mutationFollowShipment,
      variables: {
        shipmentId: this.state.shipment.id
      }
    })
    if (result) {
      this.setState( prevState => {
        prevState.shipment.followed = !previousState
        return({ shipment: prevState.shipment})
      })
    }
  }
}

export default withApollo(ShipmentListItem)
