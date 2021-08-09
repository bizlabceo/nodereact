//store 설정

import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducers";

const configureStore = () => {
  const middlewares = [];
  const enhancer =
    process.env.NODE_ENV == "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  return store;
};

/*
createWrapper의 역할을 간단히 말씀드리자면 
기존 getServerSideProps, getStaticProps같은 next의 라이프사이클에 
redux를 결합시키는 역할을 한다고 보시면 됩니다. 
그래서 wrapper.withRedux로 페이지를 감싸게 되면 redux가 결합된 라이프사이클을 사용할 수 있게 됩니다.
*/
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
