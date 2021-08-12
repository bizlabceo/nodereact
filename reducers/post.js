import shortid from "shortid";
import produce from "immer";
import faker from "faker";
export const initialstate = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentDone: false,
  addCommentLoading: false,
  addCommentError: null,
};

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map((v, i) => ({
      id: shortid.generate(),
      User: {
        id: shortid.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: [{ src: faker.image.image() }],
      Comments: [
        {
          User: {
            id: shortid.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));
export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data: data,
});
export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: "제로초",
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortid.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "heny",
  },
});
const reducer = (state = initialstate, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POSTS_REQUEST: {
        draft.loadPostDone = false;
        draft.loadPostLoading = true;
        draft.loadPostError = null;
        break;
      }
      case LOAD_POSTS_SUCCESS: {
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.loadPostDone = true;
        draft.loadPostLoading = false;
        draft.hasMorePosts = draft.mainPosts.length < 50;
        break;
      }
      case LOAD_POSTS_FAILURE: {
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      }
      case ADD_POST_REQUEST: {
        draft.addPostDone = false;
        draft.addPostLoading = true;
        draft.addPostError = null;
        break;
      }
      case ADD_POST_SUCCESS: {
        draft.mainPosts.unshift(dummyPost(action.data));
        draft.addPostDone = true;
        draft.addPostLoading = false;
        break;
      }
      case ADD_POST_FAILURE: {
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      }
      case REMOVE_POST_REQUEST: {
        draft.removePostDone = false;
        draft.removePostLoading = true;
        draft.removePostError = null;
        break;
      }
      case REMOVE_POST_SUCCESS: {
        draft.removePostDone = true;
        draft.removePostLoading = false;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id != action.data);
        break;
      }
      case REMOVE_POST_FAILURE: {
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      }
      case ADD_COMMENT_REQUEST: {
        draft.addCommentDone = false;
        draft.addCommentLoading = true;
        draft.addCommentError = null;
        break;
      }
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;

        /* const postIndex = state.mainPosts.findIndex(
          (v) => v.id === action.data.postId
        );
        const post = { ...state.mainPosts[postIndex] };
        post.Comments = [dummyComment(action.data.content), ...post.Comments];
        const mainPosts = [...state.mainPosts];
        mainPosts[postIndex] = post;
        return {
          ...state,
          mainPosts,
          addCommentDone: true,
          addCommentLoading: false,
        }; */
      }
      case ADD_COMMENT_FAILURE: {
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      }
      default:
        break;
    }
  });

export default reducer;
