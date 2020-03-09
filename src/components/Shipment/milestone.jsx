import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

class Milestone extends Component {
  state = {
    milestone: this.props.milestone,
  }

  _completed = (milestone) => {
    const dueDates = milestone.estimatedDateOfDeparture || milestone.estimatedDateOfArrival || milestone.devanningDate || milestone.eventDate
    if (milestone.dueDates && milestone.dueDates.length > 0){
      return <div className="text-success"> Completed </div>
    } else if ( new Date(dueDates) < new Date() ) {
      return <div className="text-danger"> Past Due </div>
    } else {
      return <div className="text-info">Pending</div>
    }
  }

  render() {
    const { milestone} = this.state
    return (
      <div className="p-2">
        <div>{milestone.milestoneType}</div>
        <div>{this._completed(milestone)}</div>
      </div>
    )
  }

}

export default withApollo(Milestone)
