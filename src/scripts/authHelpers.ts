import axios from "axios";
import useSWR from "swr";

import UserModel from "./models/users/UserModel";
import UserCredentialModel from "./models/passkeys/UserCredentialModel";

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

export function useActivePasskey(): {
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
