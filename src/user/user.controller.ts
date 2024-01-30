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
import { userService } from 'src/services/user.service';

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
    private userService: userService,
    @Inject('base_url') private url: string,
    @Inject('config') private conf: string,
  ) {
    console.log(this.url, 'url');
    console.log(this.conf, 'conf');
  }

  @Get()
  getAllUsers() {
    console.log(this.tech.getTechnologies(), 'tech');
    console.log(this.url, 'url');
    if (users.length > 0) {
      return {
        users: users,
      };
    } else {
      return {
        users: users,
        message: 'No user found',
      };
    }
  }

  @Get('/:id')
  getUserById(
    @Param() param: IPGetUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = users.find((u: any) => u.id === param.id);
    if (user) {
      res.statusCode = 200;
      return user;
    } else {
      res.statusCode = 404;
    }
  }

  @Post('/add-user')
  addNewUser(@Body() body: IAddUser) {
    users.push({ ...body, id: Math.random().toString() });
    return {
      message: 'Data Saved Successfully',
      data: users,
    };
  }

  @Put('/:id')
  updateUser(@Body() body: IAddUser, @Param() param: IPGetUser) {
    const modUser = users.map((u: any) => {
      if (u.id === param.id) {
        return { ...u, name: body.name, age: body.age };
      } else {
        return { ...u };
      }
    });
    users = modUser;
    return { user: users, message: 'User Details Update Successfully ' };
  }

  @Delete('/:id')
  deleteUser(@Param() param: IPGetUser) {
    const modData = users.filter((u: any) => u.id !== param.id);
    users = modData;
  }
}
