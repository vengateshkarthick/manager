import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IEmpData } from '../../shared/list.type';
import TeamView from './TeamView';
import GridView from './EmployeeView';

function EmpGridView() {
  const [selectedTeam, setSelectedId] = useState<string>("");
  const emp = useSelector((state: any) => state?.employee?.emp) as IEmpData[];
  console.log({ emp })
  const [filteredEmp, setFilteredEmp] = useState<IEmpData[]>();


  React.useEffect(() => {
    if(selectedTeam.length) {
       const slectedEmpData = emp.filter(({ team_id }) => team_id === selectedTeam);
       setFilteredEmp(() => slectedEmpData);
    }
  }, [selectedTeam])
    
    return (
        <div className="h-auto container flex flex-col gap-4 mx-auto justify-center items-start ">
           <TeamView onSelectTeam={setSelectedId} selectedTeamId={selectedTeam} />
           <GridView empList={filteredEmp || []} />
        </div>
    )
}

export default EmpGridView;