

<p align="center">
    <a href="https://www.npmjs.com/package/gatsby-source-hashnode-devblog">
      <img src="https://elasticbeanstalk-ap-southeast-1-805366489044.s3.amazonaws.com/images/uploads/2019/03/30/gatsby_3lGK7jo.gif" alt="gridsome logo" width="500"/>
    </a>
    <h1 align="center">gatsby-source-hashnode-devblog</h1>
    <p align="center">
     Gatsby plugin to retrieve blog posts from your <a href = "https://hashnode.com/devblog">devblog</a> on <a href = "https://hashnode.com/">hashnode</a>. </p>
    <p align="center"><a href="https://npmjs.com/package/gatsby-source-hashnode-devblog"><img src="https://badge.fury.io/js/gatsby-source-hashnode-devblog.svg" alt="npm version"></a><img alt="npm" src="https://img.shields.io/npm/dt/gatsby-source-hashnode-devblog"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square"><img src="https://badgen.net/github/license/nishantwrp/gatsby-source-hashnode-devblog"><img src="https://img.shields.io/david/nishantwrp/gatsby-source-hashnode-devblog"></p>
</p>

## Installation

```
# For npm
$ npm install gatsby-source-hashnode-devblog
# For yarn
$ yarn add gatsby-source-hashnode-devblog
```

## Usage

Add `gatsby-source-hashnode-devblog` to plugin array with following configurable options to `gatsby-config.js`

```js
module.exports = {
  plugins: [
    {
      resolve:  'gatsby-source-hashnode-devblog',
      options: {
        username:  '', // Your username on hashnode
      }
    }
  ]
}
```

## Example Query

```graphql
query MyQuery {
  allDevblogPost {
    edges {
      node {
        post {
          brief
          content
          contentMarkdown
          coverImage
          cuid
          dateAdded
          dateUpdated
          slug
          title
          type
          tags {
            name
          }
        }
        id
      }
    }
  }
}
```

## License (MIT)

Open [LICENSE](./LICENSE) file for more info
