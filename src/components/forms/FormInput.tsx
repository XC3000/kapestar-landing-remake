import { useEffect, useState } from "react";
import { Icons } from "../icons";
import { FormControl, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FormInputProps {
  placeholder: string;
  label?: string;
  type: "text" | "number" | "password" | "email";
  field: { value: string };
  disabled?: boolean;
  editable?: boolean;
  handleEdit?: React.ReactEventHandler;
}

const FormInput = ({
  placeholder,
  type,
  label,
  field,
  disabled,
  editable,
  handleEdit,
}: FormInputProps) => {
  const [showPass, setShowPass] = useState<boolean>(true);

  const handlePassword = () => {
    setShowPass((prev) => !prev);
  };

  const [isFloating, setIsFloating] = useState(false);
  const handleFocus = () => {
    setIsFloating(true);
  };
  const handleBlur = () => {
    if (field.value !== "") setIsFloating(true);
    if (field.value === "") setIsFloating(false);
  };

  useEffect(() => {
    if (field.value !== "") {
      setIsFloating(true);
    } else {
      setIsFloating(false);
    }
  }, [field.value]);

  return (
    <FormItem className="relative mt-3 w-full">
      <Label
        className={`${
          isFloating ? "top-0 text-blue-600" : "top-8 text-zinc-400"
        } pointer-events-none relative transform duration-300 `}
      >
        {label}
      </Label>

      <FormControl className="mt-0 flex w-full">
        <Input
          onFocusCapture={handleFocus}
          onBlurCapture={handleBlur}
          type={type === "password" && showPass === false ? "text" : type}
          placeholder={placeholder}
          disabled={disabled}
          className=" relative after:absolute after:h-full after:w-full focus-visible:border-blue-500"
          {...field}
        />
      </FormControl>

      {type === "password" && (
        <div className="absolute right-0 top-6 bg-white p-1 pb-[7px] pl-2 pt-3 dark:bg-zinc-800">
          {showPass ? (
            <Icons.eyeOff
              className="h-5 w-5 cursor-pointer"
              onClick={handlePassword}
            />
          ) : (
            <Icons.eye
              className="h-5 w-5 cursor-pointer"
              onClick={handlePassword}
            />
          )}
        </div>
      )}

      {editable && (
        <div className="absolute right-0 top-6 bg-white p-1 pb-[7px] pl-2 pt-3 dark:bg-zinc-800">
          <Icons.pencil
            className="h-5 w-5 cursor-pointer text-zinc-400"
            onClick={handleEdit}
          />
        </div>
      )}
    </FormItem>
  );
};

export default FormInput;
