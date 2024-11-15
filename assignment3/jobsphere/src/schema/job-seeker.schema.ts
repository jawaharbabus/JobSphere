// src/schemas/job-seeker.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobSeekerDocument = JobSeeker & Document;

@Schema()
export class JobSeeker {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  currentJobTitle: string;

  @Prop({ required: true })
  experienceLevel: string;

  @Prop({ type: [String], required: true })
  skills: string[];
}

export const JobSeekerSchema = SchemaFactory.createForClass(JobSeeker);
