// src/schemas/job.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema()
export class Job {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  salary: string;

  @Prop({ required: true })
  postedDate: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  requirements: string[];

  @Prop({ type: [String], required: true })
  benefits: string[];
}

export const JobSchema = SchemaFactory.createForClass(Job);
