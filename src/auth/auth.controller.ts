import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import CreateUserDto from 'src/dto/create-user.dto';
import { AuthService } from './auth.service';
import{LocalAuthGuard} from './local.guard'
import RequestWithUser from './requestWithUser.interface';


@Controller('auth')
export class AuthController{
    constructor(
        private readonly authenticationService: AuthService
      ) {}
     
      @Post('register')
      async register(@Body() registrationData: CreateUserDto) {
        return this.authenticationService.register(registrationData);
      }
     
      @HttpCode(200)
      @UseGuards(LocalAuthGuard)
      @Post('log-in')
      async logIn(@Req() request: RequestWithUser) {
        const user = request.user;
        user.password = undefined;
        return user;
      }

}