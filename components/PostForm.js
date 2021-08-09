import { Button, Form, Input } from "antd";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../reducers/post";

const PostForm = () => {
  const imagePaths = useSelector((state) => state.post.imagePaths);
  const dispatch = useDispatch();
  const imageInput = useRef();
  const [text, setText] = useState("");
  const onChangeText = useCallback((e) => {
    setText(e.target.vlaue);
  }, []);
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);
  const onSubmit = useCallback(() => {
    dispatch(addPost);
    setText("");
  }, []);
  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="what?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>image upload</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          gogo
        </Button>
      </div>
      {imagePaths.map((v) => (
        <div key={v} style={{ display: "inline-block" }}>
          <img src={v} style={{ width: "200px" }} alt={v} />
          <div>
            <Button> clear</Button>
          </div>
        </div>
      ))}
    </Form>
  );
};

export default PostForm;
