import { Module } from '@nestjs/common';
import { JobSeekerModule } from './jobseeker/jobseeker.module';
import { TalentSeekerModule } from './talentseeker/talentseeker.module';

@Module({
  imports: [JobSeekerModule, TalentSeekerModule],
})
export class AppModule {}
