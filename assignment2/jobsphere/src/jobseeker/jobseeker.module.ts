import { Module } from '@nestjs/common';
import { JobSeekerController } from './jobseeker.controller';
import { JobSeekerService } from './jobseeker.service';

@Module({
  controllers: [JobSeekerController],
  providers: [JobSeekerService],
})
export class JobSeekerModule {}
