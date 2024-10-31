import { Module } from '@nestjs/common';
import { JobSeekerModule } from './jobseeker/jobseeker.module';

@Module({
  imports: [JobSeekerModule],
})
export class AppModule {}
