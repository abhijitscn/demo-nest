import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { AppService } from './app.service';
import { TechnologiesService } from './services/tech.service';
import { userService } from './services/user.service';
const dbConfig: string = 'prod';
@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [
    AppService,
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
})
export class AppModule {}
