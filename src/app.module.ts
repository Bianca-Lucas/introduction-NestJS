import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./users/users.module";

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [],
  exports: [],
})

export class AppModule {}