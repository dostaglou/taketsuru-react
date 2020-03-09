import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import 'element-theme-default'
import Milestone from './milestone'

class Milestones extends Component {
  state = {
    milestones: this.props.milestones
  }

  render() {
    return (
    <div className="border-bottom py-1 d-flex justify-content-around overflow-auto">
      { this.state.milestones.map((milestone, index) => {
        return (
            <Milestone key={index} milestone={milestone} last={this.milestones && this.milestones.length} />
        )
      })}
    </div>
    )
  }

}

export default withApollo(Milestones)
