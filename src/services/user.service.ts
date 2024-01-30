import { Injectable } from '@nestjs/common';

interface IUsers {
  name: string;
  age: number;
  id: string;
}
interface IAddUser {
  name: string;
  age: number;
}
interface IPGetUser {
  id: string;
}
const users: IUsers[] = [];
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
}
