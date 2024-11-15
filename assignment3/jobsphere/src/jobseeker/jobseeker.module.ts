import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSeekerController } from './jobseeker.controller';
import { JobSeekerService } from './jobseeker.service';
import { JobSeeker, JobSeekerSchema } from '../schema/job-seeker.schema';
import { Job, JobSchema } from '../schema/job.schema';
import {
  JobApplication,
  JobApplicationSchema,
} from '../schema/job-application.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Job.name, schema: JobSchema },
      { name: JobSeeker.name, schema: JobSeekerSchema },
      { name: JobApplication.name, schema: JobApplicationSchema },
    ]),
  ],
  controllers: [JobSeekerController],
  providers: [JobSeekerService],
})
export class JobSeekerModule {}
