import { Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import RequestWithUser from './auth/requestWithUser.interface';
import { LocalAuthGuard } from './auth/local.guard';
import { AuthService } from './auth/auth.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private authService : AuthService) {}


}
