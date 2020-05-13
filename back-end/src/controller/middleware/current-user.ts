import { Action } from "routing-controllers";
import { verify } from "jsonwebtoken";
import UserService from "../../service/user-service/user-service";
import { isTokenExist } from "./helper";
const currentUser = async (action: Action) => {
  try {
    const jwtToken = (action.request.get("authorization") as string).split(
      " "
    )[1];

    if (isTokenExist(jwtToken)) {
      const { name } = (await verify(jwtToken, process.env.SECRET)) as {
        name: string;
      };

      const userService = new UserService();
      const user = await userService.findUserByName(name);
      if (user.length && user.length === 1) {
        return user.pop();
      }
    }

    throw new Error("find more than one user");
  } catch (e) {
    throw new Error(e);
  }
};

export default currentUser;
