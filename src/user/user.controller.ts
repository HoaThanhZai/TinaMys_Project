import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { async } from 'rxjs';
import { User } from 'src/entity/user.entity';


@Controller('user')
export class UserController {

    constructor(private readonly userService : UserService){};
    @Get()
    async getAll()
    {
        return await this.userService.findAll();
    }

    @Get(':id')
    async getById(@Param('id') id:number):Promise<User|null>{
        return await this.userService.getById(id);
    }
}
