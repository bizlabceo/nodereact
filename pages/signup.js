import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { Button, Form, Input } from "antd";
import { useCallback, useState } from "react";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Password from "antd/lib/input/Password";

const Errormessage = styled.div`
  color: red;
`;

const signup = () => {
  const [id, onChangeId] = useInput("");
  const [nickname, onChangeNick] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onChangepasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value != password);
    },
    [password]
  );

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState("");
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(id, nickname, password);
  }, [Password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">id</label>
          <br />
          <Input name="user-id" value={id} required onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-nick">nickname</label>
          <br />
          <Input
            name="user-nick"
            value={nickname}
            required
            onChange={onChangeNick}
          />
        </div>
        <div>
          <label htmlFor="user-password">password</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">password-check</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangepasswordCheck}
          />
          {passwordError && <Errormessage>비빌번호 똑바로 쳐라이</Errormessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            are you agree?
          </Checkbox>
          {termError && <Errormessage>you sudo agree</Errormessage>}
        </div>
        <div>
          <Button type="primary" htmlType="submit">
            sign up
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default signup;
