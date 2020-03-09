import React, { Component } from 'react'
import { Navbar, Nav, Figure } from 'react-bootstrap'

class Navigation extends Component {
  genericLinkCss = 'text-white font-weight-bold border-bottom text-center'
  lastLinkCss = "text-white font-weight-bold text-center"

  render() {
    if (!this.props.loggedIn){
      return (
        <Navbar bg="primary" expand="lg">
        <Navbar.Brand className="text-white font-weight-bolder m-auto" href="/mainpage">Shippio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className={this.genericLinkCss} href="/Login">Login</Nav.Link>
              <Nav.Link className={this.lastLinkCss} href="/Login">SignUp</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )
    }
    return (
        <Navbar bg="primary" expand="lg" >
          <Figure className="m-0">
            <Figure.Image className="m-0"
              width={30}
              height={30}
              src="https://via.placeholder.com/30"
              roundedCircle={true}
            />
          </Figure>
          <Navbar.Brand className="text-white font-weight-bolder" href="/mainpage">Shippio</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/profile" className={this.genericLinkCss} >Profile</Nav.Link>
              <Nav.Link href="/inquiries" className={this.genericLinkCss}>Inquiries</Nav.Link>
              <Nav.Link href="/shipments" className={this.genericLinkCss}>Shipments</Nav.Link>
              <Nav.Link href="" className={this.genericLinkCss}>Bills</Nav.Link>
              <Nav.Link href="" className={this.genericLinkCss}>Tasks</Nav.Link>
              <Nav.Link href="" className={this.genericLinkCss}>Contacts</Nav.Link>
              <Nav.Link href="" className={this.genericLinkCss}>Company Information</Nav.Link>
              <Nav.Link href="/mainpage" onClick={ this._logout } className={this.lastLinkCss} >Log Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    )
  }

  _logout = () => {
    this.props.logout()
  }
}

export default Navigation
