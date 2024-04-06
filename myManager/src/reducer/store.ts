import { configureStore, createSlice } from "@reduxjs/toolkit";
import { IEmpData } from "../shared/list.type";

//TODO: need to remove structuredClone if deepCopy works fine

export const empStore = createSlice({
  name: "employeeStore",
  initialState: {
    emp: [] as Array<IEmpData>,
    selectedemp: new Object() as IEmpData,
  },
  reducers: {
    setInitialempList: (state, action) => {
      state.emp = [...action.payload];
    },

    addemp: (state, action) => {
      console.log(action.payload)
      const newemp = {...action.payload, id: `ID0${state.emp.length + 1}`}
      state.emp.push(newemp);
    },

    updateemp: (state, action) => {
      const { id, ...rest }: IEmpData = action.payload;
      const idx = state.emp.findIndex((pdt) => pdt.id == id);
      console.log({ ...rest })
      state.emp[idx] = { ...rest, id };
      // const updated_emp = [...state.emp];
      // state.emp = updated_emp;
      state.selectedemp = new Object() as IEmpData;
    },
    deleteemp: (state, action) => {
      const { emp: oldempId } = state;
      state.emp = [...oldempId.filter((item) => !action.payload.includes(item.id))];

    },

    fetchempDetails: (state, action) => {
      const pdt = state.emp.findIndex((prd) => prd.id === action.payload)
      console.log(pdt, action.payload)
      if (pdt !== -1) state.selectedemp = state.emp[pdt];
      else state.selectedemp = {} as IEmpData;
      
    },
  },
});

export const {
  addemp,
  updateemp,
  deleteemp,
  setInitialempList,
  fetchempDetails,
} = empStore.actions;