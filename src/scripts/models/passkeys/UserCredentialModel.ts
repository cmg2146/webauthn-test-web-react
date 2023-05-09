import ModelBase from "../ModelBase";

export default interface UserCredentialModel extends ModelBase {
  userId: bigint;
  attestationFormatId: string;
  displayName: string;
}