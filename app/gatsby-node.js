/**
 * https://docs.google.com/forms/d/e/1FAIpQLSfVGQjEvU3_Rfvem6cuOdZjNePYYXFbC6TOsYhyclifImInCQ/viewform?usp=pp_url&entry.950216314=1&entry.996302659=2
 *
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const _ = require("lodash")
require("dotenv").config({
  path: `config/.env.${process.env.NODE_ENV}`,
})

const googleFormBaseUrl = process.env.GOOGLE_FORM_BASE_URL
console.log('process.env.NODE_ENV', process.env.NODE_ENV, 'googleFormBaseUrl',googleFormBaseUrl)


// You can delete this file if you're not using it

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `googleSheetSheet1Row`) {
    if (node.youtube==null || node.youtube==undefined || node.youtube.trim() == 0) return
    const tags = [node.tag1, node.tag2, node.tag3, node.tag4].filter(
      x => x != undefined && x != null && x.trim().length > 0
    ).map(x=>x.trim())

    createNodeField({
      node,
      name: `slug`,
      value: `/sketches/s${("" + node.season).padStart(2, 0)}/${(
        "" + node.sketch
      ).padStart(3, 0)}`,
    })

    createNodeField({
      node,
      name: `characters`,
      value: [
        node.character1,
        node.character2,
        node.character3,
        node.character4,
        node.character5,
        node.character6
      ].filter(x => x != undefined && x != null && x.trim().length > 0).map(x=>x.trim()),
    })

    createNodeField({
      node,
      name: `tags`,
      value: tags,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allGoogleSheetSheet1Row {
        edges {
          node {
            title
            season
            sketch
            title
            youtube
            thumbnail
            fields {
              slug
              characters
              tags
            }
          }
        }
      }
    }
  `)

  const edges = result.data.allGoogleSheetSheet1Row.edges.filter(e=>e.node && e.node.youtube)
console.log('edges ', edges.length)
  const allTags = Array.from(
    new Set(
      edges.map(e => e.node.fields.tags)
        .flat()
    )
  )

  const allCharacters = Array.from(
    new Set(
      edges.map(e => e.node.fields.characters)
        .flat()
    )
  )


  createPage({
    path: `/tags/`,
    component: path.resolve(`./src/templates/tags.js`),
    context: {
      tags: allTags,
    },
  })


  createPage({
    path: `/characters/`,
    component: path.resolve(`./src/templates/characters.js`),
    context: {
      characters: allCharacters,
    },
  })

  const tagsMap = allTags.reduce((c, v) => {
    c[v] = []
    return c
  }, {})

  const charactersMap = allCharacters.reduce((c, v) => {
    c[v] = []
    return c
  }, {})


  edges.reduce((curr, edge) => {
    edge.node.fields.tags.forEach(t => curr[t].push(edge.node))
    return curr
  }, tagsMap)


  edges.reduce((curr, edge) => {
    edge.node.fields.characters.forEach(c => curr[c].push(edge.node))
    return curr
  }, charactersMap)


  Object.keys(tagsMap).forEach(t => {
    createPage({
      path: `/tags/${t}`,
      component: path.resolve(`./src/templates/tag.js`),
      context: {
        nodes: tagsMap[t],
        tag: t,
      },
    })
  })

  Object.keys(charactersMap).forEach(c => {
    createPage({
      path: `/characters/${c}`,
      component: path.resolve(`./src/templates/character.js`),
      context: {
        nodes: charactersMap[c],
        character: c,
      },
    })
  })


  edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/sketch.js`),
      context: {
        slug: node.fields.slug,
        characters: node.fields.characters,
        tags: node.fields.tags,
        googleFormBaseUrl: googleFormBaseUrl
      },
    })
  })
}
