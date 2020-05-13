import { Schema, SchemaType, SchemaTypes, model } from "mongoose";
import { IRole, IRoleModel } from "./types";

export const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { collection: "role" }
);

export const RoleModel = model<IRoleModel>("role", roleSchema);
