import { Action } from "routing-controllers";
import { verify } from "jsonwebtoken";
import UserService from "../../service/user-service/user-service";
import { difference } from "lodash";
import { isTokenExist } from "./helper";
const IsAuth = async (action: Action, roles: string[]) => {
  try {
    const jwtToken = action.request.get("authorization").split(" ")[1];
    if (!isTokenExist(jwtToken)) {
      return false;
    }
    const { name, role } = (await verify(jwtToken, process.env.SECRET)) as {
      name: string;
      role: string[];
    };

    const userService = new UserService();
    const user = await userService.findUserByName(name);
    if (user && difference(roles, role).length === 0) {
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
};

export default IsAuth;
