import { Card, Avatar, Button } from "antd";
import { useCallback } from "react";

const UserProfile = ({ setIsLoggedIn }) => {
  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          <br />0
        </div>,
        <div key="followings">
          <br />0
        </div>,
        <div key="followings">
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>lee</Avatar>} title="lee young wook" />
      <Button onClick={onLogOut}>logout</Button>
    </Card>
  );
};
export default UserProfile;
