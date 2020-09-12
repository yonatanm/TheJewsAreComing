import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

export default function Characters(props) {
  const { characters, charactersMap } = props.pageContext
  characters.sort((c1, c2)=> {
    const delta = charactersMap[c2].length - charactersMap[c1].length
    if (delta != 0) return delta
    return c2 - c1
  })


  console.log("charactersMap", charactersMap)

  return (
    <Layout>
      <h1>{characters.length} דמויות</h1>
      <ul className="characters">
        {characters.map(c => {
          return (
            <div key={c}>
              <li className="character">
                <Link to={`/characters/${c}`}>
                  {c} ({charactersMap[c].length})
                </Link>
              </li>
              <br />
            </div>
          )
        })}
      </ul>
    </Layout>
  )
}
