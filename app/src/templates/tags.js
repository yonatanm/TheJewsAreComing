import React from "react"
import Layout from "../components/layout"
import {Link} from "gatsby"

export default function Tags( props ) {  
  const {tags, tagsMap} = props.pageContext
  tags.sort((t1, t2)=> {
    const delta = tagsMap[t2].length - tagsMap[t1].length
    if (delta != 0) return delta
    return t2 - t1
  })
  return (
    <Layout domain="tags">
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
