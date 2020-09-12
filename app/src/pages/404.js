import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>לא קיים</h1>
    <p>חיפשנו וחיפשנו את העמוד שרצית ו... וואללה, לא מצאנו. באסה!<span role="img" aria-label="sad">😞</span></p>
  </Layout>
)

export default NotFoundPage
