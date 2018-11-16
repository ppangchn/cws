import React, { Component } from 'react'
import { Navbar, Nav, NavLink } from 'reactstrap'
import styled from 'styled-components'
class Footer extends Component {
    render() {
        return (<Navbar style={{
            backgroundColor: 'rgb(238,128,126)',
            color: 'white',
        }}>
            <Nav><NavLink>About</NavLink><NavLink>Privacy Policy</NavLink></Nav>
        </Navbar>);
    }
}

export default Footer;