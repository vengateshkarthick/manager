import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table";
import FilterBar from "./FilterBar";
import { IEmpData } from "../../shared/list.type";
import { deleteemp } from "../../reducer/store";
import { config } from "./helper";
import ConfirmationModal from "../../components/Modal";
import { IListConfig } from "../../components/Table/type";

function EmpList() {
  const emp = useSelector((state: any) => state?.employee?.emp);
  const [empCopy, setempCopy] = React.useState<IEmpData[]>();
  const [selectedId, setSelectedId] = React.useState<string[] | null>(null);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (emp) {
      setempCopy(emp);
    }
  }, [emp]);

  const handleEdit = (id: string) => {
    navigate(`/form/${id}`);
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  // const handleClose = () => {

  // }

  const handleConfirm = () => {
    setSelectedId(null);
    setShowModal(false);
    dispatch(deleteemp(selectedId));
  };

  return (
    <div className="h-auto container flex flex-wrap gap-4 mx-auto justify-center items-start ">
      <FilterBar
        emp={empCopy || []}
        setemp={(prdts) => setempCopy([...prdts])}
        handleDelete={handleDelete}
        enableDeleteBtn={!!selectedId}
        handleClear={() => setempCopy([...emp])}
      />
      <Table
        config={config as IListConfig[]}
        data={empCopy || []}
        isSelectable
        id="custom-react-table"
        canEdit
        handleEdit={(data) => handleEdit(data.id)}
        onSelectRow={(id) => setSelectedId(id)}
      />

      <ConfirmationModal
        onClose={() => setShowModal(false)}
        open={showModal}
        handleConfirm={handleConfirm}
        header="Please confirm!! the employee details will be premanantely deleted.."
      />
    </div>
  );
}

export default EmpList;