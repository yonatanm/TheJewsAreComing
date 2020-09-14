import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { ListOptions } from "../components/listOptions"
import { useLocalStorage } from "../hooks/useLocalStorage"

export default function Characters({ pageContext: { characters, charactersMap } }) {
  const [sortType, setSortType] = useLocalStorage('sortType', 'frequency')
  const [displayType, setDisplayType] = useLocalStorage('displayType', 'cloud')

  if (sortType === 'frequency') {
    characters.sort((c1, c2) => {
      const delta = charactersMap[c2].length - charactersMap[c1].length
      return delta !== 0 ? delta : c2 - c1
    })
  } else {
    characters.sort()
  }

  return (
    <Layout domain="characters">
      <div className="title">
        <h1>{characters.length} דמויות</h1>
        <ListOptions sortType={sortType} setSortType={setSortType} displayType={displayType} setDisplayType={setDisplayType} />
      </div>
      <ul className={`list characters ${displayType}`}>
        {characters.map(c => (
          <div key={c}>
            <li className="character">
              <Link to={`/characters/${c}`}>
                {c} ({charactersMap[c].length})
              </Link>
            </li>
            <br />
          </div>
        ))}
      </ul>
    </Layout>
  )
}
