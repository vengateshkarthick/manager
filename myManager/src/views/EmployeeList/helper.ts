import apiData from '../../api.json';

export const config = [
    {
        accessor: 'name',
        header: "Name",
        canSort: true,
    },
    {
        accessor: 'category',
        header: "Category",
        canSort: true,
    }, 
    {
        accessor: 'description',
        header: "Description",
        canSort: true,
    }, 
    {
        accessor: 'expiry',
        header: "Expiry",
        canSort: true,
        isDateColumn: "YYYY-MM-DD",
    }, 
    {
       header: 'Selling Price',
        accessor: "sp",
        canSort: true,
    },
    {
        header: 'Discount',
        accessor: "discount_percentage",
        canSort: true,
    }, 
    {
        accessor: 'cp',
        header: "Cost Price",
        canSort: true,
    },
    {
        accessor: 'final_price',
        header: "Final Amount in INR",
        canSort: true,
    }
];


export function getApiData() {
    return apiData;
 }