import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { TalentSeekerService } from './talentseeker.service';
import { Job } from '../schema/job.schema';
import { TalentSeeker } from '../schema/talent-seeker.schema';
import { JobApplication } from '../schema/job-application.schema';

@Controller('api/talentseeker')
export class TalentSeekerController {
  constructor(private readonly talentSeekerService: TalentSeekerService) {}

  @Post('register')
  addTalentSeeker(@Body() seeker: TalentSeeker) {
    return this.talentSeekerService.addTalentSeeker(seeker);
  }

  @Post('postjob')
  postJob(@Body() job: Job) {
    return this.talentSeekerService.postJob(job);
  }

  @Put(':id')
  updateJob(@Param('id') id: string, @Body() updatedJob: Job) {
    return this.talentSeekerService.updateJob(id, updatedJob);
  }

  @Get('applications/:jobId')
  getApplications(@Param('jobId') jobId: string): Promise<JobApplication[]> {
    return this.talentSeekerService.getApplications(jobId);
  }
}
