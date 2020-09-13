import React from "react"
import {Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./sketch.css"
import Share from "../components/share"

export default function Sketch( props ) {  
  const sketch = props.data.googleSheetSheet1Row
  const formUrl = `${props.pageContext.googleFormBaseUrl}?embedded=true&usp=pp_url&entry.950216314=${sketch.season}&entry.996302659=${sketch.sketch}&entry.274032217=${encodeURIComponent(sketch.title)}`
  const youtubeId = new URL(sketch.youtube).searchParams.get('v')
  const youtubeIframeUr = `https://www.youtube.com/embed/${youtubeId}`
  const showEdit = sketch.status.trim() === 'Edit'


  const getLocationAndTimeInfo= () => {
    const hasYaer =  sketch.year!= null && sketch.year.trim().length >0
    const hasLocation = sketch.location != null  && sketch.location.trim().length > 0

    const asArray = []
    if (hasLocation) asArray.push(sketch.location.trim())
    if (hasYaer) asArray.push(sketch.year.trim())

    return asArray.join(', ')
  }

  const thumbnailURL = new URL(sketch.thumbnail)
  const fullimageLink =
    thumbnailURL.protocol +
    "//" +
    thumbnailURL.host +
    thumbnailURL.pathname

    const siteUrl= props.data.site.siteMetadata.url.replace(/\/$/, "");


  return (
    <Layout>
      <SEO title={sketch.title} image={fullimageLink} />
      <div>        
        <h1>{sketch.title}</h1>
        <h3>עונה {sketch.season}</h3>

        <span>{getLocationAndTimeInfo()}</span>

        {props.pageContext.characters.length>0?
          <ul className='character'>
            דמויות:
              {props.pageContext.characters.map(c=>{
                const l = '/characters/'+c
                return (<Link key={l} to={l}><li className='character'>{c}</li></Link> )
              })}
          </ul>
        :null}
        {props.pageContext.tags.length>0?
          <ul tag='tags'>
            תגיות:
            {props.pageContext.tags.map(t=>{
              const l = '/tags/'+t
              return (<Link key={l} to={l}><li className='tag'>{t}</li></Link> )
            })}
          </ul>
        :null}
        <iframe title={sketch.title} width="100%" height="315" src={youtubeIframeUr} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <Share
				socialConfig={{
          twitterHandle: '',
					config: {
						url: `${siteUrl}${props.pageContext.slug}`,
						title : sketch.title
					},
				}}
				tags={['היהודים_באים']}
			/>
        {showEdit?
          <>
            <h3>צפי במערכון, ומלאי את הטופס</h3>
            <iframe id='google-form-id' title='טופס' src={formUrl} width='100%' height='500' frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
          </>
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
      location
    }

    site {
      siteMetadata {
        url
      }
    }
  }
`