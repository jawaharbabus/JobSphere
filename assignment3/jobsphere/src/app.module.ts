import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSeekerModule } from './jobseeker/jobseeker.module';
import { TalentSeekerModule } from './talentseeker/talentseeker.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/JobSphere'),
    JobSeekerModule,
    TalentSeekerModule,
    AuthModule,
  ],
})
export class AppModule {}
