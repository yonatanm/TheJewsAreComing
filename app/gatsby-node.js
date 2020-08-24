/**
 * https://docs.google.com/forms/d/e/1FAIpQLSfVGQjEvU3_Rfvem6cuOdZjNePYYXFbC6TOsYhyclifImInCQ/viewform?usp=pp_url&entry.950216314=1&entry.996302659=2
 *
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const _ = require("lodash")

// You can delete this file if you're not using it

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `googleSheetSheet1Row`) {
    const tags = [node.tag1, node.tag2, node.tag3, node.tag4].filter(
      x => x != undefined && x != null && x.trim().length > 0
    )

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
      ].filter(x => x != undefined && x != null && x.trim().length > 0),
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

  const allTags = Array.from(
    new Set(
      result.data.allGoogleSheetSheet1Row.edges
        .map(e => e.node.fields.tags)
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


  const tagsMap = allTags.reduce((c, v) => {
    c[v] = []
    return c
  }, {})

  console.log("tagsMap", tagsMap)

  result.data.allGoogleSheetSheet1Row.edges.reduce((curr, edge) => {
    const tags = edge.node.fields.tags
    tags.forEach(t => {
      curr[t].push(edge.node)
    })
    return curr
  }, tagsMap)

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

  result.data.allGoogleSheetSheet1Row.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/sketch.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        characters: node.fields.characters,
        tags: node.fields.tags,
      },
    })
  })
}
