import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from "@nestjs/common";
import CreateUserDto from "src/dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


export class AuthService {
    constructor(
      private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
    ) {}
   
    public async register(registrationData: CreateUserDto) {
      const hashedPassword = await bcrypt.hash(registrationData.password, 10);
      try {
        const createdUser = await this.userService.create({
          ...registrationData,
          password: hashedPassword
        });
        createdUser.password = undefined;
        return createdUser;
      } catch (error) {
        throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }


    public async getAuthenticatedUser(email: string, hashedPassword: string) {
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
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
      }
  }