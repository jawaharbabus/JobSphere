import { Injectable } from '@nestjs/common';
import { TalentSeeker, Job, JobApplication } from './data';
import { talentSeekers, jobs, jobApplications } from './data';

@Injectable()
export class TalentSeekerService {
  private talentSeekers = talentSeekers;
  private jobs = jobs;
  private jobApplications = jobApplications;

  addTalentSeeker(seeker: TalentSeeker): TalentSeeker {
    seeker.id = this.talentSeekers.length + 1;
    this.talentSeekers.push(seeker);
    return seeker;
  }

  postJob(job: Job): Job {
    job.id = this.jobs.length + 1;
    job.postedDate = new Date();
    this.jobs.push(job);
    return job;
  }

  updateJob(id: number, updatedJob: Partial<Job>): Job | undefined {
    const jobIndex = this.jobs.findIndex((job) => job.id === id);
    if (jobIndex === -1) return undefined;

    this.jobs[jobIndex] = { ...this.jobs[jobIndex], ...updatedJob };
    return this.jobs[jobIndex];
  }

  getApplications(jobId: number): JobApplication[] {
    return this.jobApplications.filter((app) => app.jobId === jobId);
  }
}
