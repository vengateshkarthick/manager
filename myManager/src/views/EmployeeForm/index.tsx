import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addemp, fetchempDetails, updateemp } from "../../reducer/store";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";
import CalendarPicker from "../../components/Calendar";
import { team_id, roles } from "../../shared/constants/categories";
import addProductIcon from "../../assets/formImg.svg";
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
  const { selectedemp } = useSelector((state: any) => state?.employee) as any;
  const [name, setName] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
  });
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teamOptions = React.useMemo(() => team_id, []);
  const roleOptions = React.useMemo(() => roles, []);

  React.useEffect(() => {
    if (id !== "create") {
      dispatch(fetchempDetails(id));
    }
  }, [id]);

  React.useEffect(() => {
    if ((selectedemp?.id as string) && teamOptions.length) {
      const { team_id, name, role, ...rest } = selectedemp;
      const [firstname, middlename, lastname] = name.split(" ");

      const ctg = teamOptions.find(
        (opt) => opt.id.toLowerCase() === team_id.toLowerCase()
      );
      const _roleOpt = roleOptions.find(
        (opt) => opt.id.toLowerCase() === role.toLowerCase()
      );

      setName(() => ({ firstname, middlename, lastname }));
      setFormData(() => ({
        team_id: ctg ? [ctg] : [],
        role: _roleOpt,
        ...rest,
      }));
    }
  }, [selectedemp, teamOptions]);

  const onCreateEmployee = (payload: any) => {
    toast("Congratulations on new hire", {
      position: "top-right",
      theme: "colored",
      type: "success",
      autoClose: 2000,
    });
    dispatch(addemp(payload));
    navigate("/home", { replace: true });
  };

  const onUpdateEmployee = (payload: any) => {
    toast("Successfully removed an employee", {
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
      team_id: data.team_id?.[0]?.id,
      name: name.firstname + name.middlename + name.lastname,
      role: data.role[0]?.label,
    };
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    const isValid = requiredFields.every((field) =>
      Boolean(formData?.[field as productKeys])
    );

    if (!isValid) {
      toast("Please fill all the detials ...", {
        position: "top-right",
        type: "error",
        theme: "light",
        autoClose: 1000,
      });

      return;
    } else {
      e?.preventDefault();
      const payload = createPayload(formData);
      if (id === "create") {
        onCreateEmployee(payload);
      } else {
        onUpdateEmployee(payload);
      }
    }
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTeam = (team: { id: string; label: string }[]) => {
    handleFormChange("team_id", team);
  };

  const handleRole = (role: { id: string; label: string }[]) => {
    handleFormChange("role", role);
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
    <div className="m-auto h-[80vh] w-[80vw] p-1 flex justify-start items-center border rounded-md border-slate-300">
      <div className="h-full w-[45%]">
        <img src={addProductIcon} alt="add emp" className="h-full w-full" />
      </div>
      <form
        className="form w-[65%] flex flex-col gap-6 items-start justify-start h-full overflow-y-auto p-4"
        onSubmit={handleSubmit}
      >
        <div className="font-normal text-left text-xl font-[Poppins]">
          {id !== "create" ? "Edit the emp details..." : "Add new employee..."}
        </div>
        <div className="flex justify-start items-center gap-4">
          <TextInput
            name="name"
            key="name"
            onTextInputChange={(val) =>
              setName((prev) => ({ ...prev, firstname: val }))
            }
            value={name.firstname || ""}
            required
            className="w-4/5"
            placeholder="name"
            label="First Name"
          />
          <TextInput
            name="name"
            key="name"
            onTextInputChange={(val) =>
              setName((prev) => ({ ...prev, middlename: val }))
            }
            value={name.middlename || ""}
            required
            className="w-4/5"
            placeholder="name"
            label="Middle Name"
          />
          <TextInput
            name="name"
            key="name"
            onTextInputChange={(val) =>
              setName((prev) => ({ ...prev, lastname: val }))
            }
            value={name.lastname || ""}
            required
            className="w-4/5"
            placeholder="name"
            label="Last Name"
          />
        </div>

        <div className="flex flex-col w-1/2">
          <div className="font-normal text-left text-sm font-[Poppins] my-2">
            Enter email
          </div>
          <input
            name="email_id"
            key="email_id"
            type="text"
            onChange={(e) =>
              handleFormChange("personal_email_id", e.target.value)
            }
            placeholder="Enter email id"
            className="p-2 rounded border-2 text-sm placeholder:text-[#767D83] focus:border-blue-700"
          />
        </div>
        <div className="flex  items-center justify-start w-full gap-4">
          <div className="flex flex-col gap-5 items-start justify-start h-full">
            <div className="font-normal text-left text-sm font-[Poppins]">
              Select Team
            </div>
            <Dropdown
              onSelect={(opt) => handleTeam(opt)}
              options={teamOptions}
              selected={formData?.team_id || []}
              key="team_id"
              size="sm"
              isMultiSelect={false}
            />
          </div>

          
            <CalendarPicker
              date={formData?.date_of_joining}
              onSelect={(date) => handleFormChange("date_of_joining", date)}
              label="Date of Joining"
            />
         
        </div>

        <div className="h-auto w-full flex justify-between items-center flex-wrap">
          <TextInput
            name=""
            key="phone_number"
            onTextInputChange={(val) => handleFormChange("phone_number", val)}
            value={formData?.phone_number || ""}
            // inputMode="numeric"
            onKeyDown={handleOnlyNumerics}
            required
            label="Primary phone number"
            placeholder=""
          />

          <TextInput
            name=""
            key="secondary_phone_number"
            onTextInputChange={(val) =>
              handleFormChange("secondary_phone_number", val)
            }
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
          code="primary"
        />
      </form>
    </div>
  );
}

export default CreateOrEditEmployee;
