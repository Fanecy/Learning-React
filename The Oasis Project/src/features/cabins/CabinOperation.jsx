import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";

function CabinOperation() {
  return (
    <TableOperations>
      <Filter
        filterField={"discount"}
        options={[
          { value: "all", label: "全部" },
          { value: "no-discount", label: "未打折" },
          { value: "with-discount", label: "优惠" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "按名字排序 (A-Z)" },
          { value: "name-desc", label: "按名字排序 (Z-A)" },
          { value: "regularPrice-asc", label: "按价格排序 (低优先" },
          { value: "regularPrice-desc", label: "按价格排序 (高优先)" },
          { value: "maxCapacity-asc", label: "按可居住人数排序 (低优先)" },
          { value: "maxCapacity-desc", label: "按可居住人数排序 (高优先)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinOperation;
