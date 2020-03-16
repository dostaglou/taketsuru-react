import React, { Component } from 'react'
import {} from 'element-react'
import 'element-theme-default'
import { withApollo } from 'react-apollo'

class MessageDisplay extends Component {
  state = {
    messages: this.props.messages
  }

  render() {
    console.log(this.state.messages)
    return (
      <div>
        {
          this.state.messages.reverse().map((message, index) => {
            return (
              <div className="d-flex w-100 overflow-auto" key={index}>
                <div style={{width: "15%", minWidth: "40px"}} className="bg-light">{message.sender.senderType === "shipper" ? message.sender.name : null}</div>
                <div className="bg-white py-2 flex-grow-1 border-bottom">{message.content}.</div>
                <div style={{width: "15%", minWidth: "40px"}} className="bg-light">{message.sender.senderType === "operator" ? message.sender.name : null}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default withApollo(MessageDisplay)
