import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postDirektory = path.join(process.cwd(), "posts");

export function getPostData(filename) {
  const filePath = path.join(postDirektory, filename);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(fileContent);

  const postSlug = filename.replace(/\.md$/, "");

  const postData = {
    slug: postSlug,
    ...data,
    content: content,
  };

  return postData;
}

export function getAllPost() {
  const postFiles = fs.readdirSync(postDirektory);

  const allPost = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPost.sort((postA, postB) => {
    postA.date > postB.date ? -1 : 1;
  });

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPost();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}
