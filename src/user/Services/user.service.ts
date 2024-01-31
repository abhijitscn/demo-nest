import { Injectable } from '@nestjs/common';
import { IUsers, IPGetUser, IAddUser } from '../Interfaces/user.interface';
import { Response } from 'express';

let users: IUsers[] = [];
@Injectable()
export class userService {
  getUsers() {
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

  getUserById(res: Response, param: IPGetUser) {
    const user = users.find((u: any) => u.id === param.id);
    if (user) {
      res.statusCode = 200;
      return user;
    } else {
      res.statusCode = 404;
    }
  }

  handleAddNewUser(body: IAddUser) {
    users.push({ ...body, id: Math.random().toString() });
    return {
      message: 'Data Saved Successfully',
      data: users,
    };
  }

  handleUpdateUser(body: IAddUser, param: IPGetUser) {
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

  handleDeleteUser(param: IPGetUser) {
    const modData = users.filter((u: any) => u.id !== param.id);
    users = modData;
    return { user: users, message: 'User Deleted Successfully ' };
  }
}
