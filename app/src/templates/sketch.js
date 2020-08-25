import React from "react"
import {Link, graphql } from "gatsby"
import Layout from "../components/layout"
import "./sketch.css"

export default function Sketch( props ) {  
  const sketch = props.data.googleSheetSheet1Row
  const formUrl = `${props.pageContext.googleFormBaseUrl}?embedded=true&usp=pp_url&entry.950216314=${sketch.season}&entry.996302659=${sketch.sketch}&entry.274032217=${encodeURIComponent(sketch.title)}`
  const youtubeId = new URL(sketch.youtube).searchParams.get('v')
  const youtubeIframeUr = `https://www.youtube.com/embed/${youtubeId}`
  const showEdit = sketch.status.trim() === 'Edit'
  return (
    <Layout>
      <div>        
        {showEdit?
          <h1>{sketch.title} - צפי במערכון, ומלאי את הטופס</h1>
        : <h1>{sketch.title}</h1>
        }

        {sketch.year!= null && sketch.year.length >0?
          <h3>      
            שנה: {sketch.year.trim()}
          </h3>
        :null}
        {props.pageContext.characters.length>0?
          <ul className='character'>
            דמויות:
              {props.pageContext.characters.map(c=>{
                const l = '/characters/'+c
                return (<Link to={l}><li className='character'>{c}</li></Link> )
              })}
          </ul>
        :null}
        {props.pageContext.tags.length>0?
          <ul tag='tags'>
            תגיות:
            {props.pageContext.tags.map(t=>{
              const l = '/tags/'+t
              return (<Link to={l}><li className='tag'>{t}</li></Link> )
            })}
          </ul>
        :null}        
        <iframe title={sketch.title} width="100%" height="315" src={youtubeIframeUr} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <br/>
        {showEdit?
          <iframe id='google-form-id' title='טופס' src={formUrl} width='100%' height='500' frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
        :null}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    googleSheetSheet1Row(fields: { slug: { eq: $slug } }) {
      title
      year
      youtube
      sketch
      season
      thumbnail    
      status
    }
  }
`