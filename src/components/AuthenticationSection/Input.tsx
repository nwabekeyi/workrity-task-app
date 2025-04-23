// components/FormElements.tsx
import { useState, ReactNode } from "react";
import { IconType } from "react-icons";
import { HiLockClosed } from "react-icons/hi";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

interface LabelProps {
  htmlFor: string;
  children: ReactNode;
}

function Label({ htmlFor, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm/6 font-medium text-gray-900"
    >
      {children}
    </label>
  );
}

interface InputProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  icon: IconType;
}

function Input({ id, name, type, placeholder, icon: Icon }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      {type === "password" ? (
        <div className="mt-2 flex">
          <div className="-mr-px grid grow grid-cols-1 focus-within:relative">
            <input
              id={id}
              name={name}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              className="col-start-1 row-start-1 border-none block w-full rounded-l-md bg-gray-50 py-1.5 pr-3 pl-10 text-base text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-600 sm:pl-9 sm:text-sm/6"
              spellCheck="false"
              autoComplete="off"
              required
            />

            <HiLockClosed
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 border-none ml-3 size-5 self-center text-gray-400 sm:size-4"
            />
          </div>

          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="shrink-0 rounded-r-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-100 focus:relative focus:ring-2 focus:ring-purple-600"
          >
            {showPassword ? (
              <HiEyeSlash
                aria-hidden="true"
                className="-ml-0.5 size-4 text-gray-400"
              />
            ) : (
              <HiEye
                aria-hidden="true"
                className="-ml-0.5 size-4 text-gray-400"
              />
            )}
          </button>
        </div>
      ) : (
        <div className="mt-2 grid grid-cols-1">
          <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            className="col-start-1 row-start-1 border-none block w-full rounded-md bg-gray-50 py-1.5 pr-3 pl-10 text-base text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-600 sm:pl-9 sm:text-sm/6"
            spellCheck="false"
            autoComplete="off"
            required
          />
          <Icon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 border-none ml-3 size-5 self-center text-gray-400 sm:size-4"
          />
        </div>
      )}
    </div>
  );
}

export { Label, Input };
