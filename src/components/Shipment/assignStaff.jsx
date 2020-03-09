import React, { Component } from 'react'
import { Popover, Table } from 'element-react'
import { loader } from 'graphql.macro'
import { withApollo } from 'react-apollo'
import { Figure } from 'react-bootstrap'

const assignMember = loader('../../graphql/mutations/assignCustomer.gql')
const fetchOrganizationStaff = loader('../../graphql/queries/fetchOrganizationStaff.gql')


class AssignStaff extends Component {

  state = {
    shipmentId: this.props.shipmentId,
    assignedCustomer: {...this.props.assignedCustomer},
    shipment: {...this.props.shipment},
    staffOptions: [],
    selecting: false,
    table: {
      columns: [
        {
          type: 'index'
        },
        {
          label: "Name",
          prop: "name",
          width: '150'
        },
        {
          label: "Avatar",
          width: 100,
          render: () => {
            return (this._assignedCustomer())
          }
        }
      ]
    }
  }

  componentDidMount() {
    this._fetchOrganizationStaff()
  }

  render() {
    const { shipment } = this.state
    return (
      <Popover placement="right" trigger="click" style={{width: null}}
        content={(
        <Table
          rowClassName={this.rowClassName.bind(this)}
          columns={this.state.table.columns}
          data={this.state.staffOptions}
          onCurrentChange={item => this._assignMember(item)}/>
        )}>
        {this._assignedCustomer(shipment.customer)}
      </Popover>
    )
  }

  _assignedCustomer = (customer) => {
    if (customer){
      return (
        <div>
          DATA
        </div>
      )
    }
    return (
      <Figure.Image
        src="https://via.placeholder.com/30"
        width={30}
        height={30}
        roundedCircle={true}
      />
    )
  }

  rowClassName = (e) => {
    const assignedCustomer = this.state.assignedCustomer
    if (!assignedCustomer) {
      return
    }
    if (assignedCustomer.id === e.id) {
      return 'bg-info'
    }
  }

  _fetchOrganizationStaff = async () => {
    const result = await this.props.client.query({
      query: fetchOrganizationStaff,
      fetchPolicy: 'cache-first',
    })
    if (result) {
      const members = result.data.organizationStaff
      this.setState(prevState => {
        prevState.staffOptions = members
        return {prevState}
    })
    }
  }


  _assignMember = async (e) => {
    const result = await this.props.client.mutate({
      mutation: assignMember,
      variables: {
        shipmentId: this.state.shipmentId,
        customerId: e.id
      }
    })
    if (result.data) {
      const member = result.data.assignCustomer.assignedCustomer
      console.log(member)
      this.setState(prevState => {
        prevState.assignedCustomer = member
        return {prevState}
      })
    }
  }
}

export default withApollo(AssignStaff)
