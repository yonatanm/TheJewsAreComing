import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function Sketch( props ) {  
  console.log('props ', JSON.stringify(props))
  const sketch = props.data.googleSheetSheet1Row
  return (
    <Layout>
      <div>
        <h1>{sketch.title} /{sketch.sketch}</h1> 
       <h3>{sketch.characters}</h3>
        <img src={sketch.thumbnail}></img>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    googleSheetSheet1Row(fields: { slug: { eq: $slug } }) {
      title
      sketch
      characters
      thumbnail
    }
  }
`