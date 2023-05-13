import Link from "next/link";
import { FormEvent, useState } from "react";

import LoginLayout from "@/components/layouts/LoginLayout";
import Spinner from "@/components/Spinner";
import { doLoginCeremony } from "@/scripts/authHelpers";

export default function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  async function onLogin(event: FormEvent<HTMLFormElement>): Promise<any> {
    event.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    return doLoginCeremony()
      .catch((error) => {
        setLoginError(error.message);
      })
      .finally(() => {
        setIsLoggingIn(false);
      });
  };

  return (
    <LoginLayout>
      <div className="card flex flex-col items-center justify-center w-96 max-w-full">
        <h1 className="self-start text-2xl font-bold mb-8">Login</h1>
        <span className="mb-6">Click below to login with your computer, phone, or security key.</span>
        <form className="mb-10 flex flex-col items-center" onSubmit={onLogin}>
        <button
            type="submit"
            className="btn-primary"
            disabled={isLoggingIn}
          >
            {isLoggingIn && <Spinner className="mr-2 h-4 w-4"></Spinner>}
            Login
          </button>
          {loginError && <span className="mt-4 text-red-500 text-sm">{loginError}</span>}
        </form>
        <span>
          <span className="font-light text-sm">Don't have an account? </span>
          <Link href="/register" className="text-blue-400 text-sm underline">Register here.</Link>
        </span>
      </div>
    </LoginLayout>
  )
}
