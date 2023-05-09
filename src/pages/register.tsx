import { FormEvent, useState } from "react";

import InputBox from "@/components/InputBox";

import { doRegisterUserCeremony } from "@/scripts/webAuthnHelpers";

export default function Register() {
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationError, setRegistrationError] = useState("");

  function onRegister(event: FormEvent<HTMLFormElement>): Promise<any> {
    event.preventDefault();  
    setIsRegistering(true);
    setRegistrationError("");

    return doRegisterUserCeremony({
      displayName,
      firstName,
      lastName
    })
      .catch((error) => {
        setRegistrationError(error.message);
      })
      .finally(() => {
        setIsRegistering(false);
      });
  };

  // TODO: Figure out form validation
  return (
    <div className="flex flex-col items-center justify-center md:px-10 xs:px-5 py-5">
      <div className="card flex flex-col items-center justify-center xs:w-full sm:2/3 lg:w-1/2 xl:w-1/3 max-w-full">
        <h1 className="self-start text-2xl font-bold mb-8">Register</h1>
        <form className="flex flex-col" onSubmit={onRegister}>
          <InputBox
            type="text"
            name="displayName"
            label="Username/Display Name"
            value={displayName}
            onChange={setDisplayName}
          />
          <div className="mb-4"></div>
          <InputBox
            type="text"
            name="firstName"
            label="First Name"
            value={firstName}
            onChange={setFirstName}
          />
          <div className="mb-4"></div>
          <InputBox
            type="text"
            name="lastName"
            label="Last Name"
            value={lastName}
            onChange={setLastName}
          />

          <p className="mb-4 mt-8 font-light text-sm">
            When clicking "Continue" below, you will be prompted to create a credential on a device of your choice.
            You can select your current device or an external device like a phone,
            if you're using your computer, or security key.
          </p>

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="btn-primary"
              disabled={isRegistering}
            >
              Continue
            </button>

            {registrationError && <span className="mt-4 text-red-500 text-sm">{registrationError}</span>}
          </div>
        </form>
      </div>
    </div>
  )
}