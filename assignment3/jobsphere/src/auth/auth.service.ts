import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobSeeker, JobSeekerDocument } from '../schema/job-seeker.schema';
import {
  TalentSeeker,
  TalentSeekerDocument,
} from '../schema/talent-seeker.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(JobSeeker.name)
    private jobSeekerModel: Model<JobSeekerDocument>,
    @InjectModel(TalentSeeker.name)
    private talentSeekerModel: Model<TalentSeekerDocument>,
  ) {}

  // Validate and login JobSeeker
  async validateJobSeeker(email: string, password: string): Promise<any> {
    const jobSeeker = await this.jobSeekerModel.findOne({ email });
    if (jobSeeker && jobSeeker.password === password) {
      // Use proper password hashing in production
      const { password, ...result } = jobSeeker.toObject();
      return result;
    }
    return null;
  }

  async loginJobSeeker(user: any) {
    const payload = { email: user.email, sub: user._id, role: 'JobSeeker' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Validate and login TalentSeeker
  async validateTalentSeeker(email: string, password: string): Promise<any> {
    const talentSeeker = await this.talentSeekerModel.findOne({
      contactEmail: email,
    });
    if (talentSeeker && talentSeeker.password === password) {
      // Use proper password hashing in production
      const { password, ...result } = talentSeeker.toObject();
      return result;
    }
    return null;
  }

  async loginTalentSeeker(user: any) {
    const payload = { email: user.email, sub: user._id, role: 'TalentSeeker' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
