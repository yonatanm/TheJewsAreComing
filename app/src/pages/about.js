import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="אודות" />
    <h1>אודות</h1>

    <p>אנחנו אוהבים את היהודים באים!</p>

    <p>לכן החלטנו לבנות אתר שינגיש את התכנים.       תחשבו על זה כמו כל ויקיפדיה ליהודים באים.</p>
    <p>
      בשביל זה אנחנו צריכים את העזרה שלכם לתייג את המערכונים ולדעת : מי הן
      הדמויות, איזה פרק ופסוק ומהם הנושאים (תגיות) שמדוברים במערכון.
      <br />
    </p>
    <p>הכנסו    <Link to="/">לכאן</Link>, בחרו באחד המערכונים, צפו בו, תהנו ותצחקו, ומלאו הטופס.</p>  
    <p>זהו פרויקט קוד פתוח, רוצים  להשתתף בפיתוח?
    הכל נמצא <a href='https://github.com/yonatanm/TheJewsAreComing'>בגיטהאב </a>.
    </p>
    <p>
      צרי קשר
      <br />
      <a href="mailto:thejewsarecoming.tv@gmail.com">
      thejewsarecoming.tv@gmail.com
      </a>
    </p>
  </Layout>
)

export default AboutPage
