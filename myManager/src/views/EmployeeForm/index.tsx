import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addemp, fetchempDetails, updateemp } from "../../reducer/store";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";
import CalendarPicker from "../../components/Calendar";
import { team_id, roles } from "../../shared/constants/categories";
import addProductIcon from "../../assets/formImg.svg";
import { toast } from "react-toastify"
import { IEmpData } from "../../shared/list.type";

const empDetailsSchema = z
  .object({
    id: z.string().optional(),
    phone_nunber: z.string(),
    personal_mail_id: z.string().email({ message: "Enter a valid email id" }),
    firstname: z.string().nonempty({ message: "Enter your first name" }),
    middlename: z.string().optional(),
    lastname: z.string().optional(),
    secondary_phone_number: z.string().default("000 000 000"),
    date_of_joining: z
      .string()
      .datetime({ message: "Select a starting date of employee" }),
    role: z.array(z.object({ id: z.string(), label: z.string() })),
    team_id: z.array(z.object({ id: z.string(), label: z.string() })),
    currentEmployee: z.string().default("Yes").optional(),
    date_of_releving: z.string().datetime().optional(),
  })
  .required()
  .refine((val) => val.secondary_phone_number !== val.phone_nunber, {
    message: "The primary phone number and secondary number cannot be the same",
  });

// TODO: need to configure team_name, project_id and role dropdown properly
function CreateOrEditEmployee() {
  const { selectedemp } = useSelector((state: any) => state?.employee) as {
    selectedemp: IEmpData;
  };
  const {
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    control,
    getValues,
  } = useForm<z.infer<typeof empDetailsSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(empDetailsSchema),
    defaultValues: {},
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
    if (
      (selectedemp?.id as string) &&
      teamOptions.length &&
      roleOptions.length
    ) {
      const { team_id, name, role, ...rest } = selectedemp;
      const [firstname, middlename, lastname] = name.split(" ");

      const ctg = teamOptions.find(
        (opt) => opt.id.toLowerCase() === team_id.toLowerCase()
      );
      const _roleOpt = roleOptions.find(
        (opt) => opt.id.toLowerCase() === role.toLowerCase()
      );
        reset({
          firstname,
          middlename,
          lastname,
          role: [_roleOpt],
          team_id: [ctg],
          personal_mail_id: rest?.personal_mail_id,
          phone_nunber: rest?.phone_number,
          secondary_phone_number: rest?.secondary_phone_number || "000 000 000",
          date_of_joining: rest?.date_of_joining,
          currentEmployee: rest?.currentEmployee,
          date_of_releving: rest?.date_of_reliving,
          id: rest?.id,
        });
    }
  }, [selectedemp, teamOptions, roleOptions]);

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

  const createPayload = (_: any) => {
    const values = getValues();
    return {
      ...values,
      team_id: values.team_id?.[0]?.id,
      name: values.firstname + values.middlename + values.lastname,
      role: values.role[0]?.label,
    };
  };

  const onSubmit = () => {
    if (isValid) {
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

  // const handleTeam = (team: { id: string; label: string }[]) => {
  //   handleFormChange("team_id", team);
  // };

  // const handleRole = (role: { id: string; label: string }[]) => {
  //   handleFormChange("role", role);
  // };

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
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="font-normal text-left text-xl font-[Poppins]">
          {id !== "create" ? "Edit the emp details..." : "Add new employee..."}
        </div>
        <div className="flex justify-start items-center gap-4">
          <Controller
            name="firstname"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                name="firstname"
                key="firstname"
                onTextInputChange={(val) => onChange(val)}
                error={error?.message}
                value={value || ""}
                required
                className="w-4/5"
                placeholder=" "
                label="First Name"
              />
            )}
          />

          <Controller
            name="middlename"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                name="middlename"
                key="middlename"
                onTextInputChange={(val) => onChange(val)}
                error={error?.message}
                value={value || ""}
                required
                className="w-4/5"
                placeholder=" "
                label="Middle Name"
              />
            )}
          />

          <Controller
            name="lastname"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                name="lastname"
                key="lasttname"
                onTextInputChange={(val) => onChange(val)}
                error={error?.message}
                value={value || ""}
                required
                className="w-4/5"
                placeholder=" "
                label="Last Name"
              />
            )}
          />
        </div>

        <div className="flex flex-col w-1/2">
          <div className="font-normal text-left text-sm font-[Poppins] my-2">
            Enter email
          </div>
          <Controller
            name="personal_mail_id"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <input
                name="email_id"
                key="email_id"
                type="email"
                onChange={(e) => onChange(e.target.value)}
                value={value}
                placeholder="Enter email id"
                className="p-2 rounded border-2 text-sm placeholder:text-[#767D83] focus:border-blue-700"
              />
            )}
          />
          {errors?.personal_mail_id?.message && (
            <div className="col-span-1 text-sm font-normal font-[Poppins] text-nowrap my-1">
              {errors?.personal_mail_id.message}
            </div>
          )}
        </div>
        <div className="flex  items-center justify-start w-full gap-5">
          <div className="flex flex-col gap-5 items-start justify-start h-full">
            <div className="font-normal text-left text-sm font-[Poppins]">
              Select Team
            </div>
            <Controller
              name="team_id"
              control={control}
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Dropdown
                  onSelect={(opt) => onChange(opt)}
                  options={teamOptions}
                  selected={value || []}
                  key="team_id"
                  size="sm"
                  isMultiSelect={false}
                  dropDownClassName="w-[500px]"
                  error={error?.message}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-5 items-start justify-start h-full">
            <div className="font-normal text-left text-sm font-[Poppins]">
              Select Role
            </div>
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Dropdown
                  onSelect={(opt) => onChange(opt)}
                  options={teamOptions}
                  selected={value || []}
                  key="role"
                  size="sm"
                  isMultiSelect={false}
                  dropDownClassName="w-[500px]"
                  error={error?.message}
                />
              )}
            />
          </div>

          <Controller
            name="date_of_joining"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CalendarPicker
                date={value}
                onSelect={(date) => onChange(date)}
                label="Date of Joining"
                error={error?.message}
              />
            )}
          />
        </div>

        <div className="h-auto w-full flex justify-start items-center gap-5">
          <Controller
            name="phone_nunber"
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                name=""
                key="phone_number"
                onTextInputChange={(val) => onChange(val)}
                value={value || ""}
                // inputMode="numeric"
                onKeyDown={handleOnlyNumerics}
                required
                label="Primary number"
                error={error?.message}
                placeholder=""
                className="w-4/5"
              />
            )}
          />

          <Controller
            name="secondary_phone_number"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                name="secondary_phone_number"
                key="secondary_phone_number"
                onTextInputChange={(val) =>
                  onChange(val)
                }
                value={value || ""}
                // inputMode="numeric"
                error={error?.message}
                onKeyDown={handleOnlyNumerics}
                label="Secondary number"
                placeholder=""
                className="w-4/5"
              />
            )}
          />
        </div>
        <div className="w-full">
          <Button
            label={selectedemp?.id ? "Update" : "Save"}
            onClick={() => {}}
            isSubmitBtn
            variant="filled"
            code="primary"
            className="w-full"
            disabled={!isValid || !isDirty}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateOrEditEmployee;
