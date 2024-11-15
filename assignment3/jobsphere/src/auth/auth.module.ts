import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSeeker, JobSeekerSchema } from '../schema/job-seeker.schema';
import {
  TalentSeeker,
  TalentSeekerSchema,
} from '../schema/talent-seeker.schema';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'SecretKey',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([
      { name: JobSeeker.name, schema: JobSeekerSchema },
      { name: TalentSeeker.name, schema: TalentSeekerSchema },
    ]),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
