import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useEditSettings() {
  const queryClient = useQueryClient();

  const { status: settingStatus, mutate: editSetting } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "settings" });
      toast.success("设置成功保存！");
    },
    onError: (err) => toast.error(err.message),
  });

  return { settingStatus, editSetting };
}

export default useEditSettings;
