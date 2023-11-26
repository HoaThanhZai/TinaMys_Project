import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entity/user.entity';

@Controller('user')
export class UserController {

    constructor(private readonly userService : UserService){};
    @Get()
    async getAll()
    {
        return await this.userService.findAll();
    }

}
