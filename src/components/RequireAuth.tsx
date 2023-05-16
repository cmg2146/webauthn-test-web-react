import Router from "next/router";
import { ReactNode, useEffect } from "react";

import { useCurrentUser } from "@/scripts/authHelpers";
import Spinner from "./controls/Spinner";

export default function RequireAuth({
  children,
  callbackRoute = undefined
}: {
  children: ReactNode,
  callbackRoute?: string | undefined
}) {
  const { user, isLoading } = useCurrentUser();

  useEffect(() => {
    if (!isLoading && !user) {
      Router.push(`/login?callbackRoute=${Router.pathname}`, '/login');
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner className="mr-3 h-4 w-4"></Spinner>
        Loading ...
      </div>
    )
  } else {
    return <>{user ? children : ''}</>;
  }
}
