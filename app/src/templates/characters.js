import React from "react"
import Layout from "../components/layout"
import {Link} from "gatsby"

export default function Characters( props ) {  
  const {characters} = props.pageContext
  return (
    
    <Layout>
      <h1>דמויות</h1>
      <ul className='characters'>
        {characters.map(c => {
          return (
            <>
            <li className='character' key={c}>
              <Link to={`/characters/${c}`}>
                {c}
              </Link>
            </li>
            <br/>
            </>
          )
        })}
      </ul>
      
    </Layout>
  )
}