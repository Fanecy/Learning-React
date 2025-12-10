import supabase, { supabaseUrl } from "./supaBase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Cabins cannot be loaded");
    throw new Error("Cabins cannot be loaded");
  }
  return cabins;
}

export async function deleteCabins(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("删除小屋错误", error);
    throw new Error("删除小屋错误", error.message);
  }

  return data;
}

export async function addEditCabins(newCabin, id) {
  console.log(newCabin, id);

  const hasImage = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/New-Cabins/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error("创建小屋错误", error);
    throw new Error("创建小屋错误", error.message);
  }

  //设置图像
  /* 例子：https://vydgmeanfgkjybbnwznn.supabase.co/storage/v1/object/public/avatars/cabin-004.jpg */

  if (hasImage) return data; //防止重复上传
  const { error: uploadError } = await supabase.storage
    .from("New-Cabins")
    .upload(imageName, newCabin.image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.error("上传小屋图像错误", error);
    throw new Error("上传小屋图像错误", error.message);
  }

  return data;
}
