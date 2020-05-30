const axios = require('axios');
const crypto = require("crypto");

HASHNODE_API_URL = 'https://api.hashnode.com/';

async function getCuidsForAllPosts(username) {
  let query = `query{ user(username: "` + username + `") {publication {posts { cuid }}}}`;
  let { data } = await axios.post(HASHNODE_API_URL, { query: query });
  let publication = data.data.user.publication;

  if (!publication) {
    throw new Error('No publications found for this user.');
  }

  let posts = publication.posts;

  let allCuids = []
  for (let post of posts) {
    allCuids.push(post.cuid);
  }

  return allCuids;
}

function getQueryForSinglePostDetail(cuid) {
  return cuid + `:` + `post(cuid: "` + cuid + `") { cuid slug title type dateUpdated dateAdded contentMarkdown content brief coverImage tags { name }}`;
}

async function getAllPostDetails(allCuids) {
  if (!allCuids.length) {
    console.warn('No posts found in the devblog.');
    return [];
  }

  let query = `query{`;

  for (let cuid of allCuids) {
    query += getQueryForSinglePostDetail(cuid);
  }

  query += '}';

  let { data } = await axios.post(HASHNODE_API_URL, { query: query });
  data = data.data;

  let posts = [];

  for (let postCuid in data) {
    posts.push(data[postCuid]);
  }

  return posts;
}

exports.sourceNodes = async ({ actions }, options) => {
  if (!options.username) {
    throw new Error('Missing username option.')
  }

  const { createNode } = actions;

  const allCuids = await getCuidsForAllPosts(options.username);
  const posts = await getAllPostDetails(allCuids);

  for (let post of posts) {
    const jsonString = JSON.stringify(post);

    const gatsbyNode = {
      post: Object.assign({}, post),
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
