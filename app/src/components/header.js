import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, {useState} from "react"
import SideNav, { MenuIcon } from "react-simple-sidenav"

const Header = ({ siteTitle }) => {
  const [showNav, setShowNav] = useState()

  const navItems = [
    <Link to="/about">אודות</Link>,
    <Link to="/tags">תגיות</Link>,
  ]

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >

<h1 style={{ margin: 0 }}>

<MenuIcon onClick={() => setShowNav(true)} />{" "}
            <SideNav
              openFromRight={true}
              showNav={showNav}
              onHideNav={() => setShowNav(false)}
              title="תפריט"
              titleStyle={{ backgroundColor: "rebeccapurple" }}
              items={navItems}
            />



          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>

        </h1>
      </div>
    </header>
  )
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
