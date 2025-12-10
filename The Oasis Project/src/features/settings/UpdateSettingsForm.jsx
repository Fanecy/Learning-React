import Form from "../../ui/Form";
import RomForm from "../../ui/RowForm";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import useEditSettings from "./useEditSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    error,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { editSetting, settingStatus } = useEditSettings();

  function handleUpdate(e, field) {
    console.log("work");
    const value = Number(e.target.value);
    if (!value) return;

    editSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <RomForm label="预订最小天数">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={settingStatus === "loading"}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </RomForm>
      <RomForm label="预订最大天数">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={settingStatus === "loading"}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </RomForm>
      <RomForm label="最大入住人数">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={settingStatus === "loading"}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </RomForm>
      <RomForm label="早餐额外价格">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={settingStatus === "loading"}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </RomForm>
    </Form>
  );
}

export default UpdateSettingsForm;
