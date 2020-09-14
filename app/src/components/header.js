import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useEffect } from "react"
import './header.scss'

const Header = ({ domain, siteTitle }) => {
  const getTabClass = tab => tab === domain ? 'selected' : ''

  return (
    <header>
      <div>
        <h1>
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
  domain: PropTypes.oneOf(['main', 'characters', 'tags', 'about']).isRequired,
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
