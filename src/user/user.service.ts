import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto} from 'src/dto/create-user.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>
    ){}

    async findAll() : Promise<User[]>{
        return await this.userRepository.find();
    }

    async getByEmail(email:string){
        const user = await this.userRepository.findOneBy({email});

        if(user){
            return user;
        }
        throw new HttpException('Ko ton tai email!!',HttpStatus.NOT_FOUND);
    }

    async createUser(userData:CreateUserDto){
        const newUser = await this.userRepository.create(userData);
        await this.userRepository.save(newUser);
        return newUser;
    }
    async getById(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (user) {
          return user;
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
      }
}
