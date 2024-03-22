import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import EmployeeList from "./views/EmployeeList";
import CreateOrEditEmployee from "./views/EmployeeForm";
import { setInitialempList } from "./reducer/store";
import { getApiData } from "./views/EmployeeList/helper";
import Header from "./components/Header";

function App() {
  const dispatch = useDispatch();
  const  emp = useSelector((state:any) => state?.employee?.emp)
  // updating store with local json data
  React.useEffect(() => {
    if (dispatch && !emp.length) {
      dispatch(setInitialempList(getApiData()));
    }
  }, [dispatch, emp])
  return (
    <div className="h-full w-full flex flex-col gap-3 justify-start items-center flex-1">
      <Header />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "form/:id",
        element: <CreateOrEditEmployee />,
      },
    ],
  },
]);

export default function () {
  return <RouterProvider router={routes} />;
}