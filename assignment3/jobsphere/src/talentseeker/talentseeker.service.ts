import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TalentSeeker,
  TalentSeekerDocument,
} from '../schema/talent-seeker.schema';
import { Job, JobDocument } from '../schema/job.schema';
import {
  JobApplication,
  JobApplicationDocument,
} from '../schema/job-application.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class TalentSeekerService {
  constructor(
    @InjectModel(TalentSeeker.name)
    private talentSeekerModel: Model<TalentSeekerDocument>,
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    @InjectModel(JobApplication.name)
    private jobApplicationModel: Model<JobApplicationDocument>,
  ) {}

  async addTalentSeeker(seeker: Partial<TalentSeeker>): Promise<TalentSeeker> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(seeker.password, saltRounds);
    seeker.password = hashedPassword;

    const newTalentSeeker = new this.talentSeekerModel(seeker);
    return await newTalentSeeker.save();
   
  }

  async postJob(job: Partial<Job>): Promise<Job> {
    const createdJob = new this.jobModel({ ...job, postedDate: new Date() });
    return createdJob.save();
  }

  async updateJob(id: string, updatedJob: Partial<Job>): Promise<Job | null> {
    return this.jobModel
      .findByIdAndUpdate(id, updatedJob, { new: true })
      .exec();
  }

  async getApplications(jobId: string): Promise<JobApplication[]> {
    return this.jobApplicationModel.find({ jobId }).exec();
  }
}
