import supabase from "./supaBase";

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
