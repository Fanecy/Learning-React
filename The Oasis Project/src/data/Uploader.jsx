import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supaBase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

// --- 建议添加一些简单的日志函数，方便调试 ---
async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // 1. 获取数据库中真实的 ID
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((cabin) => cabin.id);

  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  // 2. 映射数据，严格对应你的截图列名
  const finalBookings = bookings.map((booking) => {
    const cabin = cabins.at(booking.cabinId - 1);

    // 计算天数和价格
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0;
    const totalPrice = cabinPrice + extrasPrice;

    // 计算状态
    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    // 3. 构建最终对象 (KEY 必须严格等于数据库列名)
    return {
      // 直接映射的字段
      startDate: booking.startDate,
      endDate: booking.endDate,
      numGuests: booking.numGuests,
      totalPrice: totalPrice,
      status: status,
      hasBreakfast: booking.hasBreakfast,
      isPaid: booking.isPaid,
      observations: booking.observations,

      // *** 需要改名的字段 (根据你的截图) ***

      // 1. 数据库叫 numOfNights (代码算出来叫 numNights)
      numOfNights: numNights,

      // 2. 数据库叫 extraPrice (代码算出来叫 extrasPrice)
      extraPrice: extrasPrice,

      // 3. 数据库叫 cabinPrice (确认一致)
      cabinPrice: cabinPrice,

      // 4. 数据库叫 guestID (注意大写的 ID)
      guestID: allGuestIds.at(booking.guestId - 1),

      // 5. 数据库叫 cabinID (注意大写的 ID)
      cabinID: allCabinIds.at(booking.cabinId - 1),
    };
  });

  console.log("准备上传的数据:", finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) {
    console.error("上传 Bookings 失败:", error.message);
    // 如果失败，抛出 alert 方便看见
    alert(`上传失败: ${error.message}`);
  } else {
    console.log("Bookings 上传成功！");
  }
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
