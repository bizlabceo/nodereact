import { Button } from "antd";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user";

const FollowButton = ({ post }) => {
  const { me, unfollowLoading, followLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id); //내가 팔로우한 사람 중 포스트 작성자 아이디랑 같은면 팔로우 중이자냐
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);

  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};

FollowButton.PropTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
