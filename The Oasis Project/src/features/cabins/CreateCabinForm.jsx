import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import RowForm from "../../ui/RowForm";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const onEdit = Boolean(cabinToEdit.id);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: onEdit ? editValues : { discount: 0 },
  });

  const { errors } = formState;

  const { statusCreate, mutateCreate } = useCreateCabin();

  const { statusEdit, mutateEdit } = useEditCabin();

  const isWorking = statusCreate === "loading" || statusEdit === "loading";

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (onEdit)
      mutateEdit(
        { cabinData: { ...data, image: image }, cabinId: editId },
        { onSuccess: () => reset() }
      );
    else mutateCreate({ ...data, image }, { onSuccess: () => reset() });
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <RowForm label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "这个匹配项未填充!" })}
        />
      </RowForm>

      <RowForm label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "这个匹配项未填充!",
            min: {
              value: 1,
              message: "最大容量至少要是1!",
            },
          })}
        />
      </RowForm>

      <RowForm label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "这个匹配项未填充!",
            min: {
              value: 1,
              message: "价格不能为0！",
            },
          })}
        />
      </RowForm>

      <RowForm label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          {...register("discount", {
            required: "这个匹配项未填充!",
            validate: (value) =>
              value <= getValues().regularPrice || "折扣不能大于价格！",
          })}
        />
      </RowForm>

      <RowForm
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          disabled={isWorking}
          {...register("description", { required: "这个匹配项未填充!" })}
        />
      </RowForm>

      <RowForm label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: onEdit ? false : "注意：您还未选择文件!",
          })}
        />
      </RowForm>

      <RowForm>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          取消
        </Button>
        <Button>{onEdit ? "编辑" : "创建"}</Button>
      </RowForm>
    </Form>
  );
}

export default CreateCabinForm;
