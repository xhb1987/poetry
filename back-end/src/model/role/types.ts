import { Document } from "mongoose";

export interface IRole {
  name: string;
}

export declare interface IRoleModel extends IRole, Document {}
