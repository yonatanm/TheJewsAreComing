import React from "react"
import Layout from "../components/layout"
import {Link} from "gatsby"
import "./sketch.css"

export default function Tags( props ) {  
  const tags = props.pageContext.tags
  return (
    
    <Layout>
      <h1>תגיות</h1>
      <ul class='tags'>
        {tags.map(t => {
          return (
            <>
            <li class='tag' key={t}>
              <Link to={`/tags/${t}`}>
                {t}
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
