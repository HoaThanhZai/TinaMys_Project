import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {CreateUserDto} from "src/dto/create-user.dto";
import { User } from "src/entity/user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
      private readonly userService: UserService,
    private readonly jwtService: JwtService,
    ) {}
   
     async register(registrationData: CreateUserDto):Promise<User |null> {
      const hashedPassword = await bcrypt.hash(registrationData.password, 10);
      try {
        const createdUser = await this.userService.createUser({
          ...registrationData,
          roles : 'user',
          password: hashedPassword,
        });
        createdUser.password = undefined;
        return createdUser;
      } catch (error) {
        console.log(error);
        throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }


     async getAuthenticatedUser(email: string, hashedPassword: string) {
        try {
          const user = await this.userService.getByEmail(email);
          const isPasswordMatching = await bcrypt.compare(
            hashedPassword,
            user.password
          );
          if (!isPasswordMatching) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
          }
          user.password = undefined;
          return user;
        } catch (error) {
          console.log(error);
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
      }

      async login(user: any) {
        const payload = {email:user.email,sub:user.id,roles: user.roles};
        const accessTokenPayload = { payload};
        const refreshTokenPayload = { sub: payload.sub };
        
        return {
          accessToken: this.jwtService.sign(accessTokenPayload),
          refreshToken: this.jwtService.sign(refreshTokenPayload)
        };
      }
  }