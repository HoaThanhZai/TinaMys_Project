import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entity/user.entity';
import { Roles } from './role.decorator';
import { Role } from 'src/interface/role.enum';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from '@nestjs/passport';
import JwtAuthenticationGuard from 'src/auth/jwt-auth.guard';


@Controller('user')
export class UserController {

    constructor(private readonly userService : UserService){};

    @Get()
    @Roles('admin')
    @UseGuards(RolesGuard,JwtAuthenticationGuard)
    async getAll()
    {
        return await this.userService.findAll();
    }

    @Get(':id')
    @Roles('admin')
    @UseGuards(RolesGuard,JwtAuthenticationGuard)
    async getById(@Param('id') id:number):Promise<User|null>{
        return await this.userService.getById(id);
    }

    @Post()
    @UseGuards(RolesGuard,JwtAuthenticationGuard)
    async createUser(@Body() newUser : CreateUserDto){
        return await this.userService.createUser(newUser);
    }

}
