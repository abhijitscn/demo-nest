import { Module } from '@nestjs/common';
import { UserController } from './Controllers/user.controller';
import { userService } from './Services/user.service';
import { TechnologiesService } from 'src/services/tech.service';
const dbConfig: string = 'prod';
@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    userService,
    TechnologiesService,
    { provide: 'base_url', useValue: 'http://www.abcd.com' },
    {
      provide: 'config',
      useFactory: () => {
        if (dbConfig === 'dev') return 'development';
        else return 'production';
      },
    },
  ],
  exports: [userService],
})
export class userModule {}
