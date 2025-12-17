import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import RowForm from "../../ui/RowForm";
import Input from "../../ui/Input";

import useUpdateUser from "./useUpdateUser";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { statusUpdateUser, mutateUpdateUser } = useUpdateUser();

  function onSubmit({ password }) {
    mutateUpdateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <RowForm label="密码（至少8个字符）" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={statusUpdateUser === "loading"}
          {...register("password", {
            required: "此字段为必填项",
            minLength: {
              value: 8,
              message: "密码至少需要8个字符",
            },
          })}
        />
      </RowForm>

      <RowForm label="确认密码" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={statusUpdateUser === "loading"}
          {...register("passwordConfirm", {
            required: "此字段为必填项",
            validate: (value) =>
              getValues().password === value || "两次输入的密码不一致",
          })}
        />
      </RowForm>
      <RowForm>
        <Button onClick={reset} type="reset" variation="secondary">
          取消
        </Button>
        <Button disabled={statusUpdateUser === "loading"}>更新密码</Button>
      </RowForm>
    </Form>
  );
}

export default UpdatePasswordForm;
