import AllPost from "../../components/posts/all-post";
import { getAllPost } from "../../lib/post-utils";

function AllPostPage(props) {
  return <AllPost posts={props.allPosts} />;
}

export function getStaticProps() {
  const AllPosts = getAllPost();

  return {
    props: {
      allPosts: AllPosts,
    },
    revalidate: 1800,
  };
}

export default AllPostPage;
