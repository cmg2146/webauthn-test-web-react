import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import LoginLayout from "@/components/layouts/LoginLayout";
import Spinner from "@/components/controls/Spinner";
import { doRegisterUserCeremony } from "@/scripts/authHelpers";
import UserCreateModel from "@/scripts/models/users/UserCreateModel";

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<UserCreateModel>();
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const router = useRouter();

  const textFieldRules = {
    required: {
      value: true,
      message: "This field is required"
    },
    maxLength: {
      value: 255,
      message: "Must be less than 255 characters"
    }
  };

  function onRegister(data: UserCreateModel, event?: React.BaseSyntheticEvent): Promise<any> {
    event?.preventDefault();
    setIsRegistering(true);
    setRegistrationError("");

    return doRegisterUserCeremony(data)
      .then(_ => router.push('/'))
      .catch((error) => {
        setRegistrationError(error.message);
        setIsRegistering(false);
      });
  };

  /**
   * When user attempts to register but the form is invalid.
   */
  function onRegisterSubmitInvalid() {
    setIsRegistering(false);
    // errors are displayed on an invalid form so this would be confusing
    setRegistrationError("");
  }

  return (
    <LoginLayout>
      <div className="card flex flex-col items-center justify-center w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="self-start text-2xl font-bold mb-8">Register</h1>
        <form className="flex flex-col" onSubmit={handleSubmit(onRegister, onRegisterSubmitInvalid)}>
          <div className="mb-4">
            <label htmlFor="displayName" className="font-medium text-sm leading-6 text-gray-900">Username</label>
            <input
              id="displayName"
              type="text"
              className={`input-primary mt-2 w-full ${errors.displayName ? 'border-red-500' : ''}`}
              aria-invalid={errors.displayName ? "true" : "false"}
              {...register("displayName", textFieldRules)}
            />
            {errors.displayName && <div className="mt-2 text-red-600" role="alert">{errors.displayName.message?.toString()}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="firstName" className="font-medium text-sm leading-6 text-gray-900">First Name</label>
            <input
              id="firstName"
              type="text"
              className={`input-primary mt-2 w-full ${errors.firstName ? 'border-red-500' : ''}`}
              aria-invalid={errors.firstName ? "true" : "false"}
              {...register("firstName", textFieldRules)}
            />
            {errors.firstName && <div className="mt-2 text-red-600" role="alert">{errors.firstName.message?.toString()}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="font-medium text-sm leading-6 text-gray-900">Last Name</label>
            <input
              id="lastName"
              type="text"
              className={`input-primary mt-2 w-full ${errors.lastName ? 'border-red-500' : ''}`}
              aria-invalid={errors.lastName ? "true" : "false"}
              {...register("lastName", textFieldRules)}
            />
            {errors.lastName && <div className="mt-2 text-red-600" role="alert">{errors.lastName.message?.toString()}</div>}
          </div>

          <p className="mb-4 mt-8 font-light text-sm">
            When clicking "Continue" below, you will be prompted to create a credential on a device of your choice.
            You can select your current device or an external device like a phone,
            if you're using your computer, or security key.
          </p>

          <div className="flex flex-col items-center">
            <button type="submit" className="btn-primary" disabled={isRegistering}>
              {isRegistering && <Spinner className="mr-2 h-4 w-4"></Spinner>}
              Continue
            </button>
            {registrationError && <div className="mt-4 text-red-500 text-sm">{registrationError}</div>}
          </div>
        </form>
      </div>
    </LoginLayout>
  )
}
