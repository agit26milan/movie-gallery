import React from 'react'
import {
    Navbar,
    NavbarBrand,
} from 'reactstrap'
import styled from 'styled-components'

const NavbarCustom = styled(Navbar)`
padding: 1rem
`

const NavbarFeature = () => {
    return (
        <div>
      <NavbarCustom color="light" light expand="md">
        <NavbarBrand href="/">Movie Gallery</NavbarBrand>       
      </NavbarCustom>
    </div>
    )
}


export default NavbarFeature