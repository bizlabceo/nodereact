import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { LOAD_POSTS_REQUEST } from "../reducers/post";

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostLoading } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);
  useEffect(() => {
    function onScroll() {
      console.log(
        window.scrollY, //얼마나 내렸는지
        document.documentElement.clientHeight, //화면에 보여지는 길이
        document.documentElement.scrollHeight //총 길이
      );
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      )
        if (hasMorePosts && !loadPostLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostLoading]);
  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
