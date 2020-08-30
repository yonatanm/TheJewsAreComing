require("dotenv").config({
  path: `config/.env.${process.env.NODE_ENV}`,
})

const siteURL = process.env.SITE_URL

const defaultPlugins = [
  {
    resolve: "gatsby-source-google-sheets",
    options: {
      spreadsheetId: "1YvCCiDAlwdPzyq5tkl1XMWm2LgSaC5Faz3_I4AiEssI",
      worksheetTitle: "sheet1",
      credentials: require("./secret.json"),
    },
  },
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-sass`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `gatsby-starter-default`,
      short_name: `starter`,
      start_url: `/`,
      background_color: `#663399`,
      theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    },
  },
];

const myPlugins = defaultPlugins

if (process.env.GOOGLE_ANALYTICS === "true") {
  myPlugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: "UA-176710736-1",
    },
  })
}

module.exports = {
  siteMetadata: {
    title: `היהודים באים`,
    description: `היהודים באים - האתר`,
    author: `thejewsarecoming.tv@gmail.com`,
    url: siteURL,
    defaultImage: `http://thejewsarecoming.tv/static/homepage.jpg`,
  },
  plugins: myPlugins
}
