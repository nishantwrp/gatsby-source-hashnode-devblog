const axios = require('axios');
const crypto = require("crypto");

HASHNODE_API_URL = 'https://api.hashnode.com/';

async function getAllPosts(username) {
  let query = `query { user(username: "` + username + `") { publication { posts { cuid slug title type dateUpdated dateAdded contentMarkdown brief coverImage tags { name }}}}}`;
  let { data } = await axios.post(HASHNODE_API_URL, { query: query });
  let publication = data.data.user.publication;

  if (!publication) {
    throw new Error('No publications found for this user.');
  }

  return publication.posts;
}

exports.sourceNodes = async ({ actions }, options) => {
  if (!options.username) {
    throw new Error('Missing username option.')
  }

  const { createNode } = actions;

  const posts = await getAllPosts(options.username);

  for (let post of posts) {
    const jsonString = JSON.stringify(post);

    const gatsbyNode = {
      ...post,
      id: `${post.cuid}`,
      parent: "__SOURCE__",
      children: [],
      internal: {
        type: 'devblogPost',
        contentDigest: crypto
          .createHash("md5")
          .update(jsonString)
          .digest("hex")
      }
    };

    createNode(gatsbyNode);
  }
}
