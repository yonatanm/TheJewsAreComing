import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import Img from "gatsby-image"

const IndexPage = ({ data }) => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    setPosts(data.allGoogleSheetSheet1Row.nodes)
  }, [data.allGoogleSheetSheet1Row.nodes])
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      {posts.map(post => (
        <div
          key={post.sketch}
          style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}
        >
          <a href={post.youtube}>
            <h2>{post.title}</h2>
            <p>{post.characters}</p>
            <img alt={post.title}
              src={post.thumbnail}
            />
          </a>
        </div>
      ))}
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
export const query = graphql`
  {
    allGoogleSheetSheet1Row {
      nodes {
        sketch
        title
        youtube
        characters
        thumbnail
      }
    }
  }
`