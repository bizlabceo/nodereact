import { Form, Input, Button } from "antd";
import { useCallback, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../reducers/user";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInDone } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  //useState는 항상 2가지가 있는 배열을 리턴한다 [stae,state를 컨들롤하는 함수]
  const [password, setPassword] = useState("");
  //useCallback은 두가지 값을 받는데 첫번째는 함수 두번째는 배열(디펜던스).
  //즉 배열에있는 값이 변경되었을때 첫번째 인자 함수가 실행
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value); //target의 value로 접근하면 input태그의 값에 접근할 수 있다.
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    console.log("loginForm");
    dispatch(loginRequestAction({ email, password }));
    console.log(email, password);
  }, [email, password]);
  return (
    <Form onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">email</label>
        <br />
        <Input
          name="user-email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
      </div>
      <div>
        <label htmlFor="user-password">password</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        {/* 버튼에 submit을 붙여줘야 form이 submit이 된다, submit이 되면
          onFinish가 호출 login */}
        <Button type="primary" htmlType="submit" loading={logInDone}>
          login
        </Button>
        <Link href="/singup">
          <a>
            <Button>signup</Button>
          </a>
        </Link>
      </ButtonWrapper>
      <div></div>
    </Form>
  );
};
export default LoginForm;
