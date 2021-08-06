import { Form, Input, Button } from "antd";
import { useCallback, useState } from "react";
import Link from "next/link";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const LoginForm = ({ setIsLoggedIn }) => {
  const [id, setId] = useState("");
  //useState는 항상 2가지가 있는 배열을 리턴한다 [stae,state를 컨들롤하는 함수]
  const [password, setPassword] = useState("");
  //useCallback은 두가지 값을 받는데 첫번째는 함수 두번째는 배열(디펜던스).
  //즉 배열에있는 값이 변경되었을때 첫번째 인자 함수가 실행
  const onChangeId = useCallback((e) => {
    setId(e.target.value); //target의 value로 접근하면 input태그의 값에 접근할 수 있다.
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true);
  }, [id, password]);
  return (
    <Form onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">id</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
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
        <Button type="primary" htmlType="submit" loading={false}>
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
