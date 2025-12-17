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
    // 修复：使用模板字符串正确拼接错误信息
    throw new Error(`删除小屋错误: ${error.message}`);
  }

  return data;
}

export async function addEditCabins(newCabin, id) {
  console.log(newCabin, id);

  // 1. 检查是否已经有图片 URL (用于编辑模式)
  // 注意：如果 newCabin.image 是 File 对象，它是没有 startsWith 方法的，所以要用可选链 ?.
  const hasImage = newCabin.image?.startsWith?.(supabaseUrl);

  // 2. 生成图片名称和路径
  // 修复：如果已经有图片(hasImage为true)，则不需要生成随机文件名，避免 .name 报错
  const imageName = hasImage
    ? null
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/New-Cabins/${imageName}`;

  // 3. 构建查询
  let query = supabase.from("cabins");

  // A) 创建模式
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) 编辑模式
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  // 4. 执行数据库操作
  const { data, error } = await query.select().single();

  if (error) {
    console.error("创建小屋错误", error);
    throw new Error(`创建小屋错误: ${error.message}`);
  }

  // 5. 如果只是修改文字没改图，或者已有图片，直接返回
  if (hasImage) return data;

  // 6. 上传图片 (只有当 hasImage 为 false 时才会执行到这里)
  const { error: uploadError } = await supabase.storage
    .from("New-Cabins")
    .upload(imageName, newCabin.image, {
      cacheControl: "3600",
      upsert: false,
    });

  // 7. 错误处理：如果图片上传失败，删除刚才创建的数据库记录（回滚）
  if (uploadError) {
    // 修复：data 是对象 (因为用了 .single())，不能用 data[0].id，必须用 data.id
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error("上传小屋图像错误", uploadError);
    throw new Error(`上传小屋图像错误: ${uploadError.message}`);
  }

  return data;
}
