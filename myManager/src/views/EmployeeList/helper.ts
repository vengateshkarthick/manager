import emp_data from '../../emp.json';

export const config = [
    {
        accessor: 'id',
        header: 'EmpID',
        canSort: true,
    },
    {
        accessor: 'name',
        header: "Name",
        canSort: true,
    },
    {
        accessor: 'team_id',
        header: "Team",
        canSort: true,
    }, 
    {
        accessor: 'role',
        header: "Role",
        canSort: true,
    }, 
    {
        accessor: 'date_of_joining',
        header: "D.O.J",
        canSort: true,
        isDateColumn: "YYYY-MM-DD",
    }, 
    {
       header: 'Project',
        accessor: "project_id",
        canSort: true,
    },
    {
        header: 'Mail ID',
        accessor: "presonal_mail_id",
    }, 
    {
        accessor: 'phone_number',
        header: "Phone number",
    },
    {
        accessor: "secondary_phone_number",
        header: "Secondary Ph.no",
    }
];


export function getApiData() {
    return emp_data;
 }