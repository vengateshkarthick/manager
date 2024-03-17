import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addemp,
  fetchempDetails,
  updateemp,
} from "../../reducer/store";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";
import CalendarPicker from "../../components/Calendar";
import { catogeries } from "../../shared/constants/categories";
import addProductIcon from "../../assets/formImg.jpg";
import { toast } from "react-toastify";
import { productKeys } from "../../components/Table/type";

const requiredFields = [
  "phone_number",
  "secondary_phone_number",
  "personal_mail_id",
  "name",
  "date_of_joining",
  "role",
  "project_id",
  "team_name",
];


// TODO: need to configure team_name, project_id and role dropdown properly
function CreateOrEditEmployee() {
  const { selectedemp } = useSelector(
    (state: any) => state?.employee
  ) as any;
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filterOptions = React.useMemo(() => catogeries, []);

  React.useEffect(() => {
    if (id !== "create") {
      dispatch(fetchempDetails(id));
    }
  }, [id]);

  React.useEffect(() => {
    if ((selectedemp?.id as string) && filterOptions.length) {
      const { category, ...rest } = selectedemp;
      const ctg = filterOptions.find(
        (opt) => opt.id.toLowerCase() === category.toLowerCase()
      );
      setFormData(() => ({
        category: ctg ? [ctg] : [],
        ...rest,
      }));
    }
  }, [selectedemp, filterOptions]);

  const onCreateProduct = (payload: any) => {
    toast("Successfully added a product", {
      position: "top-right",
      theme: "colored",
      type: "success",
      autoClose: 2000,
    });
    dispatch(addemp(payload));
    navigate("/home", { replace: true });
  };

  const onUpdateProduct = (payload: any) => {
    toast("Suceesfully updated the product", {
      position: "top-right",
      theme: "colored",
      type: "success",
      autoClose: 2000,
    });
    dispatch(updateemp(payload));
    navigate("/home", { replace: true });
  };

  const createPayload = (data: any) => {
    return {
      ...formData,
      category: data.category?.[0]?.id,
    };
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    const isValid = requiredFields.every((field) => Boolean(formData?.[field as productKeys]));

    if (!isValid) {
      toast("Please fill all the detials ...",  {
        position: "top-right",
        type: "error",
        theme: "light",
        autoClose: 1000,
       });

      return ;
    }

    else {
      e?.preventDefault();
      const payload = createPayload(formData);
      if (id === "create") {
        onCreateProduct(payload);
      } else {
        onUpdateProduct(payload);
      }
    }

    
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCategory = (category: { id: string; label: string }[]) => {
    handleFormChange("category", category);
  };

 

  const handleOnlyNumerics: React.KeyboardEventHandler<
    Omit<HTMLInputElement, "date">
  > = (e) => {
    const allowOnlyNum = Array.from(new Array(10), (_, idx) => idx.toString());
    const allowFunc = ["Backspace", "ArrowLeft", "ArrowRight"];
    if (!allowOnlyNum.includes(e.key) && !allowFunc.includes(e.key)) {
      e.preventDefault();
    }
    
  };

  const handleAlphabets: React.KeyboardEventHandler<
    Omit<HTMLInputElement, "date">
  > = (e) => {
    const allowOnlyNum = Array.from(new Array(10), (_, idx) => idx.toString());
    if (allowOnlyNum.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="m-auto h-[80vh] w-[80vw] flex justify-start items-center border rounded-md border-slate-300">
      <div className="h-full w-[45%]">
        <img src={addProductIcon} alt="add emp" className="h-full w-full" />
      </div>
      <form
        className="form w-[65%] flex flex-col gap-6 items-start justify-start h-full overflow-y-auto p-4"
        onSubmit={handleSubmit}
      >
        <div className="font-normal text-left text-xl font-[Poppins]">
          {id !== "create"
            ? "Edit the emp details..."
            : "Add new employee..."}
        </div>
        <TextInput
          name="name"
          key="name"
          onTextInputChange={(val) => handleFormChange("name", val)}
          value={formData?.name || ""}
          required
          className="w-4/5"
          placeholder="name"
          label="Employee Name"
        />

        <div className="flex justify-start items-start w-full gap-4">
          <div className="flex flex-col gap-5 items-start justify-start">
            <div className="font-normal text-left text-sm font-[Poppins]">
              Select Team
            </div>
            <Dropdown
              onSelect={(opt) => handleCategory(opt)}
              options={filterOptions}
              selected={formData?.team_id || []}
              key="category"
              size="sm"
              isMultiSelect={false}
            />
          </div>
          <div className="flex flex-col gap-5 items-start justify-start">
            <div className="font-normal text-left text-sm font-[Poppins]">
              Select Project
            </div>
            <Dropdown
              onSelect={(opt) => handleCategory(opt)}
              options={filterOptions}
              selected={formData?.project_id || []}
              key="project_id"
              size="sm"
              isMultiSelect={false}
            />
          </div>

          <div className="flex flex-col gap-5 items-start justify-start">
            <div className="font-normal text-left text-sm font-[Poppins]">
              Select Role
            </div>
            <Dropdown
              onSelect={(opt) => handleCategory(opt)}
              options={filterOptions}
              selected={formData?.role || []}
              key="role"
              size="sm"
              isMultiSelect={false}
            />
          </div>


          <CalendarPicker
            date={formData?.date_of_joining}
            onSelect={(date) => handleFormChange("date_of_joining", date)}
            label="date_of_joining"
          />
        </div>


        <div className="h-auto w-full flex justify-between items-center flex-wrap">
        <TextInput
            name=""
            key="personal_mail_id"
            onTextInputChange={(val) => handleFormChange("personal_mail_id", val)}
            value={formData?.personal_mail_id || ""}
            // inputMode="numeric"
            required
            label="Personal Email ID "
            placeholder=""
          />
          <TextInput
            name=""
            key="phone_number"
            onTextInputChange={(val) => handleFormChange("phone_number", val)}
            value={formData?.phone_number || ""}
            // inputMode="numeric"
            onKeyDown={handleAlphabets}
            required
            label="Primary phone number"
            placeholder=""
          />

          <TextInput
            name=""
            key="secondary_phone_number"
            onTextInputChange={(val) => handleFormChange("secondary_phone_number", val)}
            value={formData?.secondary_phone_number || ""}
            // inputMode="numeric"
            onKeyDown={handleOnlyNumerics}
            required
            label="Secondary phone number"
            placeholder=""
          />
          
        </div>

        <Button
          label={selectedemp?.id ? "Update" : "Save"}
          onClick={() => {}}
          isSubmitBtn
          variant="filled"
          code="success"
        />
      </form>
    </div>
  );
}

export default CreateOrEditEmployee;