import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import Img from "gatsby-image"

const IndexPage = ({ data }) => {
  const [sketches, setScketches] = useState([])
  useEffect(() => {
    setScketches(data.allGoogleSheetSheet1Row.nodes)
  }, [data.allGoogleSheetSheet1Row.nodes])
  return (
    <Layout>
      <SEO title="Home" />
      <h1>המתייגים באים</h1>
      {sketches.map(sketch => (
        <div
          key={sketch.season+"_"+sketch.sketch}          

        >
          <h2>עונה: {sketch.season} מערכון: {sketch.sketch} - {sketch.title}</h2>
          <Link to={`/sketches/s${(""+sketch.season).padStart(2,0)}/${(""+sketch.sketch).padStart(3,0)}`}>
             <img src={sketch.thumbnail}/>               
             לתיוג
         </Link>
        </div>
      ))}
    </Layout>
  )
}




export default IndexPage
export const query = graphql`
  {
    allGoogleSheetSheet1Row {
      nodes {
        season
        sketch
        title
        youtube
        thumbnail
      }
    }
  }
`