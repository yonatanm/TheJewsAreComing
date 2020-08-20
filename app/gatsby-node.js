/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)

// You can delete this file if you're not using it
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `googleSheetSheet1Row`) {
    const slug = (""+node.season).padStart(2,0) +"_"+(""+node.sketch).padStart(3,0); // createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
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
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  
  result.data.allGoogleSheetSheet1Row.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/sketch.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        x: 123
      },
    })
  })
}