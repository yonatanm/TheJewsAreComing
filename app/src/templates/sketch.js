import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function Sketch( props ) {  
  console.log('props ', JSON.stringify(props))
  const sketch = props.data.googleSheetSheet1Row
  return (
    <Layout>
      <div>
        <h1>{sketch.title}</h1> 
        <iframe width="560" height="315" src={'https://www.youtube.com/embed/'+new URL(sketch.youtube).searchParams.get('v')
}  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <iframe src={'https://docs.google.com/forms/d/e/1FAIpQLSfVGQjEvU3_Rfvem6cuOdZjNePYYXFbC6TOsYhyclifImInCQ/viewform?embedded=true&usp=pp_url&entry.950216314='+sketch.season+'&entry.996302659='+sketch.sketch} width="700" height="520" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    googleSheetSheet1Row(fields: { slug: { eq: $slug } }) {
      title
      youtube
      sketch
      season
      thumbnail
    }
  }
`