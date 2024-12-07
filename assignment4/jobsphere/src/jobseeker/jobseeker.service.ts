import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from '../schema/job.schema';
import {
  JobApplication,
  JobApplicationDocument,
} from '../schema/job-application.schema';
import { JobSeeker, JobSeekerDocument } from '../schema/job-seeker.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JobSeekerService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    @InjectModel(JobApplication.name)
    private jobApplicationModel: Model<JobApplicationDocument>,
    @InjectModel(JobSeeker.name)
    private jobSeekerModel: Model<JobSeekerDocument>,
  ) {}

  async getAllJobs(): Promise<Job[]> {
    return this.jobModel.find().exec();
  }

  async getJob(id: string): Promise<Job | null> {
    return this.jobModel.findById(id).exec();
  }

  async applyForJob(
    application: Partial<JobApplication>,
  ): Promise<JobApplication> {
    const createdApplication = new this.jobApplicationModel({
      ...application,
      applicationDate: new Date(),
    });
    return createdApplication.save();
  }

  async registerJobSeeker(jobSeeker: Partial<JobSeeker>): Promise<JobSeeker> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(jobSeeker.password, saltRounds);
    jobSeeker.password = hashedPassword;

    const newJobSeeker = new this.jobSeekerModel(jobSeeker);
    return await newJobSeeker.save();
  }

  async getJobSeeker(id: string): Promise<JobSeeker | null> {
    return this.jobSeekerModel.findById(id).exec();
  }

  async updateJobSeeker(
    id: string,
    updatedJobSeeker: Partial<JobSeeker>,
  ): Promise<JobSeeker | null> {
    return this.jobSeekerModel
      .findByIdAndUpdate(id, updatedJobSeeker, { new: true })
      .exec();
  }

  async deleteJobSeeker(id: string): Promise<boolean> {
    const result = await this.jobSeekerModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
