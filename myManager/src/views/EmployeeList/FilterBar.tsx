import React from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import { team_id } from "../../shared/constants/categories";
import TextArea from "../../components/TextInput";
import { IEmpData } from "../../shared/list.type";


function FilterBar({
  setemp,
  emp,
  handleDelete,
  enableDeleteBtn,
  handleClear,
}: {
  emp: IEmpData[];
  setemp: (emp: IEmpData[]) => void;
  handleDelete: () => void;
  enableDeleteBtn: boolean;
  handleClear: () => void;
}) {

  const hasChanges = React.useRef<boolean>();
  const filterOptions = React.useMemo(() => team_id, []);
  const [searchText, setSearchText] = React.useState<string>("");
  const [filter, setFilter] = React.useState<
    { id: string; label: string }[] | null
  >([]);

  const empRef = React.useRef<IEmpData[]>([]);

  // applying category filter and then search text inside the filter category
  const handleApply = () => {
    let filteredData = [...emp];

    if (!hasChanges.current) {

      hasChanges.current = true;
      empRef.current = [...emp];

    } else if (hasChanges.current) {
      filteredData = [...empRef.current];
    }

    const ctgIds = filter?.map((ctg) => ctg.id);

    if (searchText.length) {
      filteredData = filteredData.filter((pdt) =>
        pdt.id.includes(searchText)
      );
    }

    if (ctgIds && ctgIds.length) {
      filteredData = filteredData.filter((pdt) =>
        ctgIds.includes(pdt.team_id.toLowerCase())
      );
    }

    setemp(filteredData);
  };

  // clears all search criteria and retains redux data
  const onClearFilterData = React.useCallback(() => {
    setSearchText("");
    setFilter(() => []);
    hasChanges.current = false;
    empRef.current = [];
    handleClear();
  }, [handleClear]);

  const onRemove = () => {
    handleDelete();
  }

  return (
    <div className="my-2 h-28 w-full p-2 flex  justify-between items-center border-1 rounded-md border-amber-200 ">
      <div className="w-auto grid grid-cols-3 justify-start gap-4 items-center">
        <TextArea
          value={searchText}
          onTextInputChange={(val) => setSearchText(val)}
          placeholderText="Search with empid..."
          className="col-span-3"
        />
        <Dropdown
          onSelect={(selectedOpt) => setFilter(() => selectedOpt)}
          options={filterOptions}
          isMultiSelect
          selected={filter}
          label="Filter by Team"
          size="sm"
        />
        <Button
          code="success"
          variant="outlined"
          onClick={() => handleApply()}
          label="Apply"
          disabled={!filter?.length && !searchText.length}
          size="sm"
        />

        <Button
          code="primary"
          variant="filled"
          onClick={onClearFilterData}
          label="Clear Filters"
          size="sm"
          disabled={!hasChanges.current}
        />
      </div>

      <div className="flex justify-end items-end gap-4 mx-1 w-full md:w-[20%] h-full">
        <Button
          code="danger"
          variant="filled"
          onClick={() => onRemove()}
          label="Remove"
          disabled={!enableDeleteBtn}
          size="sm"
          key="remove"
        />
      </div>
    </div>
  );
}

export default FilterBar;