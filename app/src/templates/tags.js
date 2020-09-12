import React from "react"
import Layout from "../components/layout"
import {Link} from "gatsby"

export default function Tags( props ) {  
  const {tags, tagsMap} = props.pageContext
  return (
    
    <Layout>
      <h1>{tags.length} תגיות</h1>
      <ul className='tags'>
        {tags.map(t => {
          return (
            <div key={t}>
            <li className='tag'>
              <Link to={`/tags/${t}`}>
                {t} ({tagsMap[t].length})
              </Link>
            </li>
            <br/>
            </div>
          )
        })}
      </ul>
      
    </Layout>
  )
}
