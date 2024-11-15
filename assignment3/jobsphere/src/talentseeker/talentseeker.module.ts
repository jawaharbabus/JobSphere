import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TalentSeekerController } from './talentseeker.controller';
import { TalentSeekerService } from './talentseeker.service';
import { Job, JobSchema } from '../schema/job.schema';
import {
  JobApplication,
  JobApplicationSchema,
} from '../schema/job-application.schema';
import {
  TalentSeeker,
  TalentSeekerSchema,
} from '../schema/talent-seeker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Job.name, schema: JobSchema },
      { name: TalentSeeker.name, schema: TalentSeekerSchema },
      { name: JobApplication.name, schema: JobApplicationSchema },
    ]),
  ],
  controllers: [TalentSeekerController],
  providers: [TalentSeekerService],
})
export class TalentSeekerModule {}
