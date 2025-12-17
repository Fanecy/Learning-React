import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import RowForm from "../../ui/RowForm";
import Input from "../../ui/Input";

import useUser from "./useUser";
import useUpdateUser from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const { mutateUpdateUser, statusUpdateUser } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName) return;
    mutateUpdateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);

    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <RowForm label="电子邮箱">
        <Input value={email} disabled />
      </RowForm>
      <RowForm label="全名">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={statusUpdateUser === "loading"}
          id="fullName"
        />
      </RowForm>
      <RowForm label="头像图片">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={statusUpdateUser === "loading"}
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </RowForm>
      <RowForm>
        <Button
          type="reset"
          variation="secondary"
          disabled={statusUpdateUser === "loading"}
          id="fullName"
          onClick={handleCancel}
        >
          取消
        </Button>
        <Button disabled={statusUpdateUser === "loading"} id="fullName">
          更新账户
        </Button>
      </RowForm>
    </Form>
  );
}

export default UpdateUserDataForm;
