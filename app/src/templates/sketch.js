import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function Sketch( props ) {  
  const sketch = props.data.googleSheetSheet1Row
  
  const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSfVGQjEvU3_Rfvem6cuOdZjNePYYXFbC6TOsYhyclifImInCQ/viewform?embedded=true&usp=pp_url&entry.950216314=${sketch.season}&entry.996302659=${sketch.sketch}&entry.274032217=${encodeURIComponent(sketch.title)}`
  const youtubeId = new URL(sketch.youtube).searchParams.get('v')
  const youtubeIframeUr = `https://www.youtube.com/embed/${youtubeId}`

  return (
    <Layout>
      <div>
        <h1>{sketch.title} - צפי במערכון, ומלאי את הטופס</h1>
        <iframe width="100%" height="315" src={youtubeIframeUr}  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <br/>
        <iframe src={formUrl} width='100%' height='500' frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
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