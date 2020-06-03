import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../../auth/service/auth.service";
import UserService from "../../user/service/user-service";
import { ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
