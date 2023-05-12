import axios from "axios";
import useSWR from "swr";

import UserModel from "./models/users/UserModel";
import UserCredentialModel from "./models/passkeys/UserCredentialModel";

/**
 * Uses SWR to get the current user.
 */
export function useCurrentUser(): {
  user: UserModel | undefined,
  isLoading: boolean,
  isError: any
} {
  const { data, error, isLoading } = useSWR(
    '/api/users/me',
    (url) => axios.get<UserModel>(url).then((res) => res.data));

  return {
    user: data,
    isLoading,
    isError: error
  }
}

/**
 * Uses SWR to get the passkey used by the current user to login to their current session.
 */
export function useCurrentPasskey(): {
  passkey: UserCredentialModel | undefined,
  isLoading: boolean,
  isError: any
} {
  const { data, error, isLoading } = useSWR(
    '/api/users/me/credentials/current',
    (url) => axios.get<UserCredentialModel>(url).then((res) => res.data));

  return {
    passkey: data,
    isLoading,
    isError: error
  }
}

export function logout(){
  axios.post('/api/webauthn/logout');
  window.location.href = '/login';
}
