import { Document } from "mongoose";
import { IRole, IRoleModel } from "../role/types";

export interface IUser {
  name: string;
  password: string;
  role: IRoleModel[];
}

export declare interface IUserModel extends IUser, Document {}
