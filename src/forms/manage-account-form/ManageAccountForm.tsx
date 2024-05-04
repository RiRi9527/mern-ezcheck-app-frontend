import { useGetAllUsers } from "@/api/AuthApi";
import { useAppContext } from "@/content/AppContext";
import { User } from "@/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export type AccountFromData = {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  position: string;
  hourlyWage: number;
  isAdmin: string;
  imageFile?: FileList; // for somehow, even use File here, still return a [] FileList
  imageUrl: string;
};

type Props = {
  account?: User;
  onSave: (accountFormData: FormData) => void;
  isLoading: boolean;
  isSuccess?: boolean;
  userId?: string;
};

const ManageAccountForm = ({
  onSave,
  isLoading,
  isSuccess,
  userId,
  account,
}: Props) => {
  const navigate = useNavigate();
  const { auth } = useAppContext();
  const disable =
    auth?.position !== "CEO" && auth?.position !== "Office Manager";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<AccountFromData>();

  useEffect(() => {
    if (account) {
      const isAdminString = account.isAdmin ? "Yes" : "No";
      reset({ ...account, isAdmin: isAdminString });
    }
  }, [account, reset]);

  const existingImageUrls = watch("imageUrl");

  const onSubmit = async (formDataJson: AccountFromData) => {
    const formData = new FormData();
    const isAdminBoolean = formDataJson.isAdmin === "Yes";
    formData.append("userName", formDataJson.userName);
    formData.append("password", formDataJson.password);
    formData.append("firstName", formDataJson.firstName);
    formData.append("lastName", formDataJson.lastName);
    formData.append("position", formDataJson.position);
    formData.append("hourlyWage", formDataJson.hourlyWage.toString());
    formData.append("isAdmin", isAdminBoolean.toString());
    if (formDataJson.imageFile && formDataJson.imageFile.length > 0) {
      const imageFile = formDataJson.imageFile[0];
      formData.append("imageFile", imageFile);
    }
    onSave(formData);
  };

  const { refetch } = useGetAllUsers();

  useEffect(() => {
    refetch();
  }, [onSubmit]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate(`/user-profile/${userId}`);
      }, 2000); // 2s
    }
  }, [isSuccess, navigate]);

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold">
        {account ? "Update" : "Create"} Account
      </h2>
      <div className="flex flex-cols-2">
        <div className="grid pr-4 flex-1">
          <div className={`relative group`}>
            {existingImageUrls && !selectedFile && (
              <img
                src={existingImageUrls}
                className="min-h-full object-cover"
                alt="Existing Image"
              />
            )}

            {selectedFile && (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected File"
                className="min-h-full object-cover"
              />
            )}
            <button
              disabled={disable}
              onClick={(e) => {
                e.preventDefault();
                const fileInput = document.getElementById("fileInput");
                if (fileInput) {
                  fileInput.click();
                }
              }}
              className="absolute inset-0 flex items-center justify-center bg-black text-white bg-opacity-50  opacity-0 group-hover:opacity-100"
            >
              Change Img
            </button>
          </div>
        </div>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Img
          <input
            disabled={disable}
            id="fileInput"
            type="file"
            multiple={false}
            accept=".jpg, .jpeg, .png"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("imageFile")}
            onChange={(event) => {
              handleFileChange(event);
            }}
          />
          {errors.imageFile && (
            <span className="text-red-500">{errors.imageFile.message}</span>
          )}
        </label>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            disabled={disable}
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            disabled={disable}
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Position
          <select
            disabled={disable}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("position", { required: "This field is required" })}
            defaultValue="Customer Service"
          >
            <option value="Customer Service">
              Customer Service Representative
            </option>
            <option value="Office Manager">Office Manager</option>
            <option value="Office Supervisor">Office Supervisor</option>
            <option value="CEO">CEO</option>
          </select>
          {errors.position && (
            <span className="text-red-500">{errors.position.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          hourlyWage($)
          <select
            disabled={disable}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("hourlyWage", { required: "This field is required" })}
            defaultValue="19"
          >
            {[...Array(12).keys()].map((value) => (
              <option key={value + 19} value={value + 19}>
                {value + 19}
              </option>
            ))}
          </select>
          {errors.hourlyWage && (
            <span className="text-red-500">{errors.hourlyWage.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          isAdmin
          <select
            disabled={disable}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("isAdmin", { required: "This field is required" })}
            defaultValue="No"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.isAdmin && (
            <span className="text-red-500">{errors.isAdmin.message}</span>
          )}
        </label>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          userName
          <input
            disabled={disable}
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("userName", { required: "This field is required" })}
          />
          {errors.userName && (
            <span className="text-red-500">{errors.userName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          password
          <input
            disabled={disable}
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("password", { required: "This field is required" })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
      </div>
      <span>
        {isLoading ? (
          <button className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
            Loading
          </button>
        ) : (
          <button
            disabled={disable}
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          >
            Submit
          </button>
        )}
      </span>
    </form>
  );
};

export default ManageAccountForm;
