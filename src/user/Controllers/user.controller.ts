import {
  Controller,
  Get,
  Res,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Put,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TechnologiesService } from 'src/services/tech.service';
import { userService } from '../Services/user.service';
import { IUsers } from '../Interfaces/user.interface';

interface IAddUser {
  name: string;
  age: number;
}
interface IPGetUser {
  id: string;
}

let users = [];
@Controller('/user')
export class UserController {
  constructor(
    private tech: TechnologiesService,
    private user: userService,
    @Inject('base_url') private url: string,
    @Inject('config') private conf: string,
  ) {
    console.log(this.url, 'url');
    console.log(this.conf, 'conf');
  }

  @Get()
  getAllUsers(): { message?: string; users: IUsers[] } {
    console.log(this.tech.getTechnologies(), 'tech');
    console.log(this.url, 'url');
    return this.user.getUsers();
  }

  @Get('/:id')
  getUserById(
    @Param() param: IPGetUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.user.getUserById(res, param);
  }

  @Post('/add-user')
  addNewUser(@Body() body: IAddUser): { message: string; data: IUsers[] } {
    return this.user.handleAddNewUser(body);
  }

  @Put('/:id')
  updateUser(@Body() body: IAddUser, @Param() param: IPGetUser) {
    return this.user.handleUpdateUser(body, param);
  }

  @Delete('/:id')
  deleteUser(@Param() param: IPGetUser) {
    return this.user.handleDeleteUser(param);
  }
}
