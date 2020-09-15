import React from "react"
import Layout from "../components/layout"
import {Link} from "gatsby"
import { ListOptions } from "../components/listOptions"
import { useLocalStorage } from "../hooks/useLocalStorage"

export default function Tags({ pageContext: { tags, tagsMap } }) {
  const [sortType, setSortType] = useLocalStorage('sortType', 'frequency')
  const [displayType, setDisplayType] = useLocalStorage('displayType', 'cloud')

  if (sortType === 'frequency') {
    tags.sort((t1, t2) => {
      const delta = tagsMap[t2].length - tagsMap[t1].length
      return delta !== 0 ? delta : t2 - t1
    })
  } else {
    tags.sort()
  }
  return (
    <Layout domain="tags">
      <div className="title">
        <h1>{tags.length} תגיות</h1>
        <ListOptions sortType={sortType} setSortType={setSortType} displayType={displayType} setDisplayType={setDisplayType} />
      </div>
      <ul className={`list tags ${displayType}`}>
        {tags.map(t => (
          <div key={t}>
          <li className='tag'>
            <Link to={`/tags/${t}`}>
              {t} ({tagsMap[t].length})
            </Link>
          </li>
          <br/>
          </div>
        ))}
      </ul>
    </Layout>
  )
}
