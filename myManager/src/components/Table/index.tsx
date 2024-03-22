import React from "react";
import { IEmpData } from "../../shared/list.type";
import { sortByData } from "./helper";
import { IList, productKeys } from "./type";
import Checkbox from "../Checkbox";
import sortIcon from "../../assets/sort.svg";
import editIcon from "../../assets/edit.svg";

function List(props: IList) {
  const {
    id,
    className,
    data,
    config,
    isSelectable,
    onSelectRow,
    canEdit,
    handleEdit,
  } = props;
  const [rowData, setRowData] = React.useState<Partial<IEmpData[]>>();

  const [selectAll, setSelectAll] = React.useState<boolean>(false);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

  const sortedRef = React.useRef<string[]>([]);

  const handleSelectedRows = React.useCallback(
    (rowIdx: string, isChecked: boolean) => {
      if (isChecked) setSelectedRows((prev) => [...prev, rowIdx]);
      else {
        setSelectedRows((prev) => prev.filter((id) => id !== rowIdx));
      }
    },
    []
  );

  React.useEffect(() => {
    if (selectedRows.length) onSelectRow?.(selectedRows);
  }, [selectedRows, onSelectRow]);

  React.useEffect(() => {
    if (rowData) {
      if (selectAll) {
        const rows:any = rowData.map((item) => item?.id);
        setSelectedRows(rows || []);
      }
      else if(selectedRows.length && !selectAll) {
        setSelectedRows(() => []);
      }
    }
    
  }, [selectAll]);

  React.useEffect(() => {
    if (data.length) {
      setRowData(() => data);
    }
  }, [data]);

  // render row with selectable and action functionality

  const withSelector = (config: IList["config"]) => {
    const _config = [...config];
    if (isSelectable) {
      const render = (_: IList["data"][number], properties: any) => (
        <Checkbox
          id={`selector-idx-${properties?.rowIdx?.toString()}}`}
          onChecked={(isChecked) =>
            handleSelectedRows(_.id as string, isChecked)
          }
          isChecked={selectedRows.includes(_.id)}
          className="h-full ps-2"
        />
      );
      _config.unshift({ accessor: "selector", render });
    }

    return _config;
  };

  const withActions = (config: IList["config"]) => {
    const _config = [...config];
    if (canEdit) {
      const render = (_data: IList["data"][number], customProperties: any) => (
        <div
          className="edit flex justify-center items-center cursor-pointer hover:scale-[1.5]"
          onClick={() => handleEdit?.(_data, customProperties)}
        >
          <img src={editIcon} height={20} width={20} />
        </div>
      );

      _config.push({ accessor: "edit", render });
    }

    return _config;
  };

  const renderListItem = () => {
    const withSelectableRows = withSelector(config);
    const withActionItem = withActions(withSelectableRows);

    return rowData?.map((row, idx) => {
      return (
        <>
          {withActionItem.map(({ accessor, rowClassName, render }) => {
            return (
              <div className={`relative flex justify-center items-start text-left flex-col ${rowClassName}`}>
                <div
                className={`p-2 w-full font-normal text-slate-500 text-left h-10 truncate text-sm  `}
                id={id}
                
              >
                {render?.(row as IEmpData, { rowIdx: idx.toString() }) ||
                  row?.[accessor as keyof typeof row]}
                {/*
                  need to add tooltip
                 <article className="absolute invisible hover:visible bg-[#fff] border rounded z-30  w-full text-xs p-1">
                 {!render && row?.[accessor as keyof typeof row]}
                </article> */}
                </div>
              </div>
              
             
              
            );
          })}
        </>
      );
    });
  };

  const handleSort = (field: string | number, isDateColumn?: string) => {
    if (sortedRef.current.includes(field.toString())) {
      sortedRef.current = sortedRef.current.filter(ref => ref !== field);
    }
    else {
      sortedRef.current.push(field.toString());
    }
    
    const sortedData = sortByData(
      rowData as IEmpData[],
      field as productKeys,
      isDateColumn,
      sortedRef.current.includes(field.toString()),

    );
    setRowData(() => [...sortedData as IEmpData[]]);
  };

  const renderListHeader = () => {
    return config.map(({ header, canSort, accessor, isDateColumn }) => (
      <div className="flex justify-start items-center gap-2 p-2">
        <div className="text-sm font-normal truncate text-left">
          {header}
        </div>
        {canSort && (
          <button
            className="w-auto h-auto hover:scale-[1.735] transition  ease-out delay-250"
            onClick={() => handleSort(accessor, isDateColumn)}
            type="button"
          >
            <img src={sortIcon} height={12} width={12} />
          </button>
        )}
      </div>
    ));
  };

  return (
    <div
      className={`relative grid grid-cols-${config.length + 2} w-full items-start justify-center border-2 rounded-md border-[#fbfcfe] h-[200] max-h-[50vh] overflow-y-auto ${className} cursor-pointer hover:[&>img]:block bg-[#fbfcfe]`}
      id={id}
    >
      {/* render header with selectable functionality */}
      <div></div>
      {renderListHeader()}
      <div></div>
      {renderListItem() || (
        <div className="col-span-12 text-base text-center m-auto p-3">
          No data found
        </div>
      )}
    </div>
  );
}

export default List;