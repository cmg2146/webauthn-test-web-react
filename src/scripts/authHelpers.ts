import axios from "axios";
import useSWR from "swr";
import { startAuthentication, startRegistration } from '@simplewebauthn/browser';

import UserModel from "./models/users/UserModel";
import UserCredentialModel from "./models/passkeys/UserCredentialModel";
import UserCreateModel from './models/users/UserCreateModel';

// TODO: Figure out client side auth

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
 * Uses SWR to get the WebAuthn passkey used by the current user to login to their current session.
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

/**
 * Attempts to login a user.
 */
export async function doLoginCeremony(): Promise<any> {
  // The login ceremony steps are as follows:
  //  1) retrieve authentication options/challenge
  //  2) start the client side authentication and get authenticator response
  //  3) Try to login the user by posting the authenticator response to the login endpoint.
  //     The server will respond back with a cookie if successful, logging in the user.

  return axios
    .get('/api/webauthn/authenticate')
    .then(response => startAuthentication(response.data))
    .then(assertionResponse => {
      return $auth
        .loginWith(
          'cookie', {
            url: '/api/webauthn/authenticate',
            method: 'post',
            data: assertionResponse
          }
        );
    });
}

/**
 * Attempts to create/register a new user and WebAuthn passkey simultaneously,
 * and subsequently log in the user.
 * @param user The new user's information.
 */
export async function doRegisterUserCeremony(user: UserCreateModel): Promise<any> {
  // The new user registration ceremony steps are as follows:
  //  1) retrieve attestation options/challenge
  //  2) start the client side credential creation and get authenticator response
  //  3) Try to register the user by posting the authenticator response to the register endpoint.
  //     The server will respond back with a cookie if successful, logging in the user.

  return axios
    .post('/api/webauthn/signup-start', user)
    .then(response => startRegistration(response.data))
    .then((attestationResponse) => {
      return $auth
        .loginWith(
          'cookie', {
            url: '/api/webauthn/signup-finish',
            method: 'post',
            data: attestationResponse
          }
        );
    });
}

/**
 * Attempts to create and register a new WebAuthn passkey for the current user.
 */
export async function doRegisterPasskeyCeremony(): Promise<any> {
  // The device registration ceremony steps are as follows:
  //  1) retrieve attestation options/challenge
  //  2) start the client side credential creation and get authenticator response
  //  3) Try to register the passkey by posting the authenticator response to the register endpoint.

  return axios
    .get('/api/webauthn/register')
    .then(response => startRegistration(response.data))
    .then((attestationResponse) => {
      return axios.post('/api/webauthn/register', attestationResponse);
    })
}

/**
 * Logs the current user out.
 */
export function logout(){
  axios.post('/api/webauthn/logout');
  window.location.href = '/login';
}
