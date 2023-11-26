import { Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import RequestWithUser from './interface/requestWithUser.interface';
import { LocalAuthGuard } from './auth/local.guard';
import { AuthService } from './auth/auth.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private authService : AuthService) {}

}
