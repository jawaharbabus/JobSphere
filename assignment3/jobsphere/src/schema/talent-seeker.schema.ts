// src/schemas/talent-seeker.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TalentSeekerDocument = TalentSeeker & Document;

@Schema()
export class TalentSeeker {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  contactName: string;

  @Prop({ required: true })
  contactEmail: string;

  @Prop({ required: true })
  contactPhone: string;

  @Prop({ required: true })
  password: string;
}

export const TalentSeekerSchema = SchemaFactory.createForClass(TalentSeeker);
