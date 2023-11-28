import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import {CreateUserDto} from 'src/dto/create-user.dto';
import { AuthService } from './auth.service';
import{LocalAuthGuard} from './local.guard'
import JwtAuthenticationGuard from './jwt-auth.guard';



@Controller('auth')
export class AuthController{
    constructor(
        private readonly authenticationService: AuthService
      ) {}
     
      @Post('register')
      async register(@Body() registrationData: CreateUserDto) {
        return this.authenticationService.register(registrationData);
      }
     

      @UseGuards(LocalAuthGuard)
      @Post('log-in')
      async logIn(@Request() request) {
        return await this.authenticationService.login(request.user);
      }

      @UseGuards(JwtAuthenticationGuard)
      @Get('reLogIn')
      reLogIn(@Request() request):string{
        return request.user;
      }

}