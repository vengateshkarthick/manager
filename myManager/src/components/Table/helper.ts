import { IEmpData } from "../../shared/list.type";
import { productKeys } from "./type";


const handleComparison = (
  fieldData1: string | number,
  fieldData2: string | number
) => {
  if (fieldData1 < fieldData2) return -1;

  if (fieldData1 > fieldData2) return 1;

  else return 0;
};

// sorting product data with string number and date 
export const sortByData = (data: IEmpData[], field: productKeys, isDateColumn?: string, sortByAsec?: boolean) => {
   let fieldData1;
   let fieldData2;
  if (isDateColumn && field) {

    return [...data].sort((a, b) => {
      //@ts-ignore
      return sortByAsec ? new Date(a[field]) - new Date(b[field])  : new Date(b[field]) - new Date(a[field])

    })
  }
   
  else {
    return [...data].sort((a, b) => {

      fieldData1 = a[field]
      fieldData2 = b[field]

      if (typeof fieldData1 === "string" && typeof fieldData2 === "string") {
        fieldData1 = fieldData1.toUpperCase();
        fieldData2 = fieldData2.toUpperCase();

        return sortByAsec ? handleComparison(fieldData1, fieldData2) : handleComparison(fieldData2, fieldData1);
      }
      //@ts-ignore
      return sortByAsec ? fieldData1 - fieldData2 : fieldData2 - fieldData1;
      
    });
  }
};