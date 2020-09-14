import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, {useState} from "react"
import './header.scss';

function getSelectedTab() {
  if (window.location.pathname.match(/^\/about/)) {
    return 'about'
  }

  if (window.location.pathname.match(/^\/characters/)) {
    return 'characters'
  }

  if (window.location.pathname.match(/^\/tags/)) {
    return 'tags'
  }

  return 'main'
}

const Header = ({ siteTitle }) => {
  const selectedTab = getSelectedTab()
  const getTabClass = tab => tab === selectedTab ? 'selected' : ''

  return (
    <header>
      <div>
        <h1 style={{ margin: 0 }}>
          <Link to="/">{siteTitle}</Link>
        </h1>

        <nav>
          <ul>
            <li className={getTabClass('main')}>
              <h4>
                <Link to="/">עמוד ראשי</Link>
              </h4>
            </li>
            <li className={getTabClass('characters')}>
              <h4>
                <Link to="/characters">דמויות</Link>
              </h4>
            </li>
            <li className={getTabClass('tags')}>
              <h4>
                <Link to="/tags">תגיות</Link>
              </h4>
            </li>
            <li className={getTabClass('about')}>
              <h4>
                <Link to="/about">אודות</Link>
              </h4>
            </li>
          </ul>
        </nav>
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
