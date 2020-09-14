import React, {useEffect, useState} from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "./home.css"
import { navigate } from "gatsby" //import navigate from gatsby
import Share from "../components/share"

// Import css files
import ImageGallery from "react-image-gallery"

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  }
  return a
}

const Home = props => {
  const sketches = props.pageContext.data.allGoogleSheetSheet1Row.nodes
  const [showGalary, setShowGalary] = useState(false);
  useEffect(() => {
    if (window.location.hostname.indexOf('thejewsarecoming.surge.sh') >= 0) {
      window.location.href = "http://www.thejewsarecoming.tv";
    }
    if (window.location.hostname.indexOf('thejewsarecoming.tv') >= 0) {
      window.location.href = "http://www.thejewsarecoming.tv";
    }
    setShowGalary(true)
  })

  const hasSketches = sketches && sketches.length > 0
  const isEditable = n => n && n.youtube && n.status.trim() === "Edit"
  const isReady = n => n && n.youtube && n.status.trim() === "Done"
  const sketchesToView = hasSketches ? sketches.filter(isReady) : []

  const onClick = (e, index) => {
    const hashIndex = e.target.src.indexOf("#")
    const slug = e.target.src.substr(hashIndex + 1)
    navigate(slug)
  }

  const renderItem  = (item) => {
    return <Link to={item.slug}>
        <img className='image-gallery-image' src={item.original}></img>
        <span className='image-gallery-description'>{item.description}</span>
      </Link>
  }

  const getImagesToCarousel = () => {
    if (hasSketches) {
      const sketchesToEdit = sketches.filter(isEditable)
      const sketchsToCarousel = shuffle(
        sketchesToEdit.map(s => {
          return {
            thumbnail: s.thumbnail,
            season: s.season,
            sketch: s.sketch,
            title: s.title,
          }
        })
      ).slice(0, 10)
      const images = sketchsToCarousel.map(s => {
        const thumbnailURL = new URL(s.thumbnail)
        const fullimageLink =
          thumbnailURL.protocol +
          "//" +
          thumbnailURL.host +
          thumbnailURL.pathname
        const slug = `/sketches/s${("" + s.season).padStart(2, 0)}/${(
          "" + s.sketch
        ).padStart(3, 0)}`
        const text = `עונה: ${s.season} מערכון: ${s.sketch} - ${s.title}`
        return {
          original: `${fullimageLink}`,
          description: text,
          slug
        }
      })
      return images
    }
  }

  return (
    <Layout domain="main">
      <SEO title="היהודים באים" />
      <p>
        אנחנו אוהבים את היהודים באים! לכן החלטנו לבנות אתר שינגיש את התכנים.
        תחשבו על זה כמו כל ויקיפדיה ליהודים באים.
      </p>
      <p>
        בשביל זה אנחנו צריכים את העזרה שלכם לתייג את המערכונים ולדעת : מי הן
        הדמויות, איזה פרק ופסוק ומהם הנושאים (תגיות) שמדוברים במערכון.
        <br />
        בחרי באחד המערכונים בקרוסלה 👇, צפי, תהני ותצחקי, ומלאי את הטופס.
        <b> {sketchesToView.length} מערכונים כבר תויגו. </b>
      </p>
      <Share
        socialConfig={{
          twitterHandle: "",
          config: {
            url: `${props.pageContext.data.site.siteMetadata.url}`,
            title: props.pageContext.data.site.siteMetadata.description,
          },
        }}
        tags={["היהודים_באים"]}
      />

      {(showGalary && hasSketches)?
        <ImageGallery
          showFullscreenButton={false}
          showThumbnails={false}
          showPlayButton={false}
          isRTL={true}
          // onClick={(e, index) => onClick(e, index)}
          renderItem={(a,b,c) => renderItem(a,b,c)}
          items={getImagesToCarousel()}
        />
      : null}

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
            <Link
              key={sketch.season + "_" + sketch.sketch}
              to={`/sketches/s${("" + sketch.season).padStart(2, 0)}/${(
                "" + sketch.sketch
              ).padStart(3, 0)}`}
            >
              <li className="sketch-preview">
                <h2>{sketch.title}</h2>
                <img src={fullimageLink} alt={sketch.title} />
                <hr />
              </li>
            </Link>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Home
