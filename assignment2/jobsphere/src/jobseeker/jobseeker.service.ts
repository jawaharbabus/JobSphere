import { Injectable } from '@nestjs/common';
import {
  Job,
  JobApplication,
  JobSeeker,
  jobs,
  jobApplications,
  jobSeekers,
} from '../data/data';

@Injectable()
export class JobSeekerService {
  getAllJobs(): Job[] {
    return jobs;
  }

  getJob(id: number): Job | undefined {
    return jobs.find((job) => job.id === id);
  }

  applyForJob(application: JobApplication): JobApplication {
    application.id = jobApplications.length + 1;
    application.applicationDate = new Date();
    jobApplications.push(application);
    return application;
  }

  registerJobSeeker(jobSeeker: JobSeeker): JobSeeker {
    jobSeeker.id = jobSeekers.length + 1;
    jobSeekers.push(jobSeeker);
    return jobSeeker;
  }

  getJobSeeker(id: number): JobSeeker | undefined {
    return jobSeekers.find((seeker) => seeker.id === id);
  }

  updateJobSeeker(
    id: number,
    updatedJobSeeker: JobSeeker,
  ): JobSeeker | undefined {
    const index = jobSeekers.findIndex((seeker) => seeker.id === id);
    if (index !== -1) {
      jobSeekers[index] = { ...jobSeekers[index], ...updatedJobSeeker, id };
      return jobSeekers[index];
    }
    return undefined;
  }

  deleteJobSeeker(id: number): boolean {
    const index = jobSeekers.findIndex((seeker) => seeker.id === id);
    if (index !== -1) {
      jobSeekers.splice(index, 1);
      return true;
    }
    return false;
  }
}
