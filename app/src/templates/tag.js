import React from "react"
import Layout from "../components/layout"
import {Link} from "gatsby"

export default function Tag( props ) {  
  const nodes = props.pageContext.nodes
  return (
    <Layout domain="tags">
      <h1>{props.pageContext.tag}</h1>

      <ul className='sketches-preview'>
        {nodes.map(n => {
          const fields = n.fields
          const thumbnailURL = new URL(n.thumbnail)
          const fullimageLink =
            thumbnailURL.protocol +
            "//" +
            thumbnailURL.host +
            thumbnailURL.pathname

          return (
            <li className='sketch-preview' key={fields.slug}>
              <Link
                to={fields.slug}
              >
                <h2>
                  {n.title}
                </h2>
                <img src={fullimageLink} alt={n.title}/>
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}
