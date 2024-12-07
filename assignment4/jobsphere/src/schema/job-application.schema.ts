// src/schemas/job-application.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type JobApplicationDocument = JobApplication & Document;

@Schema()
export class JobApplication {
  @Prop({ type: Types.ObjectId, ref: 'Job', required: true })
  jobId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'JobSeeker', required: true })
  jobSeekerId: Types.ObjectId;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  coverLetter: string;

  @Prop({ required: true })
  applicationDate: Date;
}

export const JobApplicationSchema =
  SchemaFactory.createForClass(JobApplication);
