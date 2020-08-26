import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"
import { navigate } from "gatsby" //import navigate from gatsby

// Import css files
import ImageGallery from "react-image-gallery"

function shuffle(a) {
  console.log('in shuffle before:', a[0].season+"_"+a[0].sketch)
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  console.log('in shuffle after:', a[0].season+"_"+a[0].sketch)
  return a
}

const IndexPage = ({ data }) => {
  const isEditable = n => n && n.youtube && n.status.trim() === "Edit"
  const isReady = n => n && n.youtube && n.status.trim() === "Done"
  const sketchesToView = data.allGoogleSheetSheet1Row.nodes.filter(isReady)


  const onClick = e => {
    const hashIndex = e.target.src.indexOf("#")
    const slug = e.target.src.substr(hashIndex + 1)
    navigate(slug)
  }

  const getImagesToCarousel = () => {
    const sketchesToEdit = data.allGoogleSheetSheet1Row.nodes.filter(isEditable)
    const sketchsToCarousel = shuffle([...sketchesToEdit]).filter((v,index)=>index < 10)

    const images = sketchsToCarousel.map(s => {
      const thumbnailURL = new URL(s.thumbnail)
      const fullimageLink =
        thumbnailURL.protocol + "//" + thumbnailURL.host + thumbnailURL.pathname
      const slug = `/sketches/s${("" + s.season).padStart(2, 0)}/${(
        "" + s.sketch
      ).padStart(3, 0)}`
      const text = `עונה: ${s.season} מערכון: ${s.sketch} - ${s.title}`
      return {
        original: `${fullimageLink}#${slug}`,
        description: text,
      }
    })

    return images
  }

  return (
    <Layout>
      <SEO title="המתייגים באים" />
      <p>אנחנו אוהבים את היהודים באים!</p>
      <b> {sketchesToView.length} מערכונים כבר תויגו </b>
      <p>
        לכן החלטנו לבנות אתר שינגיש את התכנים. תחשבו על זה כמו כל ויקיפדיה
        ליהודים באים.
      </p>
      <p>
        בשביל זה אנחנו צריכים את העזרה שלכם לתייג את המערכונים ולדעת : מי הן
        הדמויות, איזה פרק ופסוק ומהם הנושאים (תגיות) שמדוברים במערכון.
        <br />
        בחרי באחד המערכונים בקרוסלה 👇, צפי, תהני ותצחקי, ומלאי את הטופס.
      </p>
      <ImageGallery
        showFullscreenButton={false}
        showThumbnails={false}
        showPlayButton={false}
        isRTL={true}
        onClick={e => onClick(e)}
        items={getImagesToCarousel()}
      />

      <h2>המערכונים שתויגו - תודה רבה לכולם על העזרה</h2>
      <ul className="sketches-preview">
        {sketchesToView.map(sketch => {
          const thumbnailURL = new URL(sketch.thumbnail)
          const fullimageLink =
            thumbnailURL.protocol +
            "//" +
            thumbnailURL.host +
            thumbnailURL.pathname

          return (
            <li
              className="sketch-preview"
              key={sketch.season + "_" + sketch.sketch}
            >
              <Link
                to={`/sketches/s${("" + sketch.season).padStart(2, 0)}/${(
                  "" + sketch.sketch
                ).padStart(3, 0)}`}
              >
                <h2>
                  עונה: {sketch.season} מערכון: {sketch.sketch} - {sketch.title}
                </h2>
                <img src={fullimageLink} alt={sketch.title} />
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
        status
      }
    }
  }
`
