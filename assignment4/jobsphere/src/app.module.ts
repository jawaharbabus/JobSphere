import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSeekerModule } from './jobseeker/jobseeker.module';
import { TalentSeekerModule } from './talentseeker/talentseeker.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/JobSphere'),
    JobSeekerModule,
    TalentSeekerModule,
    AuthModule,
  ],
})
@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
