import { Fragment } from "react";
import FeaturedPost from "../components/home/featuredPost";
import Hero from "../components/home/hero";
import { getFeaturedPosts } from "../lib/post-utils";

function HomePage(props) {
  return (
    <Fragment>
      <Hero />
      <FeaturedPost posts={props.posts} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 1800,
  };
}

export default HomePage;
