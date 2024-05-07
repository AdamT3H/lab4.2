import {
    BadRequestException,
    Body,
    Controller,
    Post
} from '@nestjs/common';
import { UserService } from '../service';
import { UserDto } from '../models';
import { UserAlreadyInUse, UserWasNotCreated } from '../shared';

@Controller({path: '/users'})
export class UsersController{
    constructor (private readonly userService: UserService){}

    @Post('/')
    async createUser(@Body() body: UserDto){
        try {
            const result = await this.userService.createUser(body);
            return result;
        } catch (err) {
            if (err instanceof UserAlreadyInUse) {
              throw new BadRequestException(err.message);
            }
            throw err;
        }
    };

    @Post('/login')
    async loginUser(@Body() body: UserDto){
        try {
            const result = await this.userService.loginUser(body);
            return result;
        } catch (err) {
            if (err instanceof UserWasNotCreated) {
              throw new BadRequestException(err.message);
            }
            throw err;
        }
    }
};