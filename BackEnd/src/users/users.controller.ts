/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './database/user.schema';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Get()  
    async  getAllUsers(): Promise<User[]> {
        return await this.usersService.findAllUsers();
    }
    @Get( ':id')
     async getOneUser(@Param('id') id): Promise<User> {
         return await this.usersService.findUser(id);
     }
     @Post("/signUp")
      createUser(@Body() user: User) {
          return this.usersService.create(user);
      }
      @Post("/login")
       loginUser(@Body() user: User) {
           return this.usersService.login(user.email,user.password);
       }
      @Put(':id')
       updateUser(@Param('id') id , @Body() user: User ) {
           return this.usersService.updateUser(id, user );  
       }
      @Delete(':id')  
       removeUser(@Param('id') id) {
           return this.usersService.removeUser(id);
       }
}
