import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSeekerModule } from './jobseeker/jobseeker.module';
import { TalentSeekerModule } from './talentseeker/talentseeker.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/JobSphere'),
    JobSeekerModule,
    TalentSeekerModule,
  ],
})
export class AppModule {}
