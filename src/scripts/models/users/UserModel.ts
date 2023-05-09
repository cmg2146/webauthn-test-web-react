import ModelBase from "../ModelBase";
import UserModelBase from "./UserModelBase";

export default interface UserModel extends UserModelBase, ModelBase {
  userHandle: string;
}