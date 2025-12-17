import Button from "../../ui/Button";
import Form from "../../ui/Form";
import RowForm from "../../ui/RowForm";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import useSignUp from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { signUpMutate, signUpStatus } = useSignUp();

  function onSubmit({ fullName, email, password }) {
    signUpMutate({ email, password, fullName }, { onSettled: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <RowForm label="名称" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={signUpStatus === "loading"}
          {...register("fullName", { required: "必填！" })}
        />
      </RowForm>

      <RowForm label="邮箱地址" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={signUpStatus === "loading"}
          {...register("email", {
            required: "必填！",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "请填入符合邮箱的格式！",
            },
          })}
        />
      </RowForm>

      <RowForm label="密码" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={signUpStatus === "loading"}
          {...register("password", {
            required: "必填！",
            minLength: {
              value: 8,
              message: "密码不能少于8位！",
            },
          })}
        />
      </RowForm>

      <RowForm label="重复密码" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={signUpStatus === "loading"}
          {...register("passwordConfirm", {
            required: "必填！",
            validate: (value) =>
              value === getValues().password || "密码不匹配！",
          })}
        />
      </RowForm>

      <RowForm>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </RowForm>
    </Form>
  );
}

export default SignupForm;
