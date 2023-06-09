import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";
import Head from "next/head";

import LoginLayout from "@/components/layouts/LoginLayout";
import Spinner from "@/components/controls/Spinner";
import FormTextInput from "@/components/controls/FormTextInput";
import { doRegisterUserCeremony } from "@/scripts/authHelpers";
import UserCreateModel from "@/scripts/models/users/UserCreateModel";

export default function Register() {
  const methods = useForm<UserCreateModel>();
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
      <Head><title>WebAuthn Demo - Register</title></Head>
      <div className="card flex flex-col items-center justify-center w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="self-start text-2xl font-bold mb-8">Register</h1>
        <FormProvider {...methods}>
          <form className="flex flex-col" onSubmit={methods.handleSubmit(onRegister, onRegisterSubmitInvalid)}>
            <FormTextInput name="displayName" label="Username" registerOptions={textFieldRules} className="mb-4"></FormTextInput>
            <FormTextInput name="firstName" label="First Name" registerOptions={textFieldRules} className="mb-4"></FormTextInput>
            <FormTextInput name="lastName" label="Last Name" registerOptions={textFieldRules} className="mb-4"></FormTextInput>

            <p className="mb-4 mt-8 font-light text-sm">
            {
              `When clicking "Continue" below, you will be prompted to create a credential on a device of your choice.
              You can select your current device or an external device like a phone,
              if you're using your computer, or security key.`
            }
            </p>

            <div className="flex flex-col items-center">
              <button type="submit" className="btn-primary" disabled={isRegistering}>
                {isRegistering && <Spinner className="mr-2 h-4 w-4"></Spinner>}
                Continue
              </button>
              {registrationError && <div className="mt-4 text-red-500 text-sm">{registrationError}</div>}
            </div>
          </form>
        </FormProvider>
      </div>
    </LoginLayout>
  );
}
