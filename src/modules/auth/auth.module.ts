import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserMongoModule } from '@shared/index';
import { AuthFactoryService } from './factory';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserMongoModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthFactoryService,ConfigService,JwtService
    // { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AuthModule {}
