import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "7天内" },
        { value: "30", label: "30天内" },
        { value: "90", label: "90天内" },
      ]}
    />
  );
}

export default DashboardFilter;
