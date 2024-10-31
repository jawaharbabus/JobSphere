import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { TalentSeekerService } from './talentseeker.service';
import { Job, TalentSeeker, JobApplication } from './data';

@Controller('api/talentseeker')
export class TalentSeekerController {
  constructor(private readonly talentSeekerService: TalentSeekerService) {}

  @Post('register')
  addTalentSeeker(@Body() seeker: TalentSeeker) {
    return this.talentSeekerService.addTalentSeeker(seeker);
  }

  @Post('post-job')
  postJob(@Body() job: Job) {
    return this.talentSeekerService.postJob(job);
  }

  @Put('update-job/:id')
  updateJob(@Param('id') id: number, @Body() updatedJob: Partial<Job>) {
    return this.talentSeekerService.updateJob(id, updatedJob);
  }

  @Get('applications/:jobId')
  getApplications(@Param('jobId') jobId: number): JobApplication[] {
    return this.talentSeekerService.getApplications(jobId);
  }
}
