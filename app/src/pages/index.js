import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"

const IndexPage = ({ data }) => {
  const [sketches, setScketches] = useState([])
  useEffect(() => {
    setScketches(data.allGoogleSheetSheet1Row.nodes)
  }, [data.allGoogleSheetSheet1Row.nodes])
  return (
    <Layout>
      <SEO title="המתייגים באים" />
      {/* <h1> בחרי מערכון והתחילי לתייג</h1> */}

      <p>אנחנו אוהבים את היהודים באים!</p>

<p>לכן החלטנו לבנות אתר שינגיש את התכנים.       תחשבו על זה כמו כל ויקיפדיה ליהודים באים.</p>
<p>
  בשביל זה אנחנו צריכים את העזרה שלכם לתייג את המערכונים ולדעת : מי הן
  הדמויות, איזה פרק ופסוק ומהם הנושאים (תגיות) שמדוברים במערכון.
  <br />
  <p> בחרו באחד המערכונים המופיעים, צפו, תהנו ותצחקו, ומלאו הטופס.</p>  
</p>


      <ul>
        {sketches.map(sketch => {
          const thumbnailURL = new URL(sketch.thumbnail)
          const fullimageLink =
            thumbnailURL.protocol +
            "//" +
            thumbnailURL.host +
            thumbnailURL.pathname

          return (
            <li key={sketch.season + "_" + sketch.sketch}>
              <Link
                to={`/sketches/s${("" + sketch.season).padStart(2, 0)}/${(
                  "" + sketch.sketch
                ).padStart(3, 0)}`}
              >
                <h2>
                  עונה: {sketch.season} מערכון: {sketch.sketch} - {sketch.title}
                </h2>
                <img src={fullimageLink} />
              </Link>
            </li>
          )
        })}
      </ul>
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
