import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { JobSeekerService } from './jobseeker.service';
import { JobApplication } from '../schema/job-application.schema';
import { JobSeeker } from '../schema/job-seeker.schema';

@Controller('api/jobseeker')
export class JobSeekerController {
  constructor(private readonly jobSeekerService: JobSeekerService) {}

  @Get('jobs')
  getAllJobs() {
    return this.jobSeekerService.getAllJobs();
  }

  @Get('jobs/:id')
  getJob(@Param('id') id: string) {
    return this.jobSeekerService.getJob(id);
  }

  @Post('apply')
  applyForJob(@Body() application: JobApplication) {
    return this.jobSeekerService.applyForJob(application);
  }

  @Post('register')
  registerJobSeeker(@Body() jobSeeker: JobSeeker) {
    return this.jobSeekerService.registerJobSeeker(jobSeeker);
  }

  @Get(':id')
  getJobSeeker(@Param('id') id: string) {
    return this.jobSeekerService.getJobSeeker(id);
  }

  @Put(':id')
  updateJobSeeker(@Param('id') id: string, @Body() jobSeeker: JobSeeker) {
    return this.jobSeekerService.updateJobSeeker(id, jobSeeker);
  }

  @Delete(':id')
  deleteJobSeeker(@Param('id') id: string) {
    return this.jobSeekerService.deleteJobSeeker(id);
  }
}
