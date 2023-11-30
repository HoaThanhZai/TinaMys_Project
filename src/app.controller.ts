import { Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local.guard';
import { AuthService } from './auth/auth.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private authService : AuthService) {}

}
