import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule],
  controllers: [],
  exports: [],
})

export class AppModule {}