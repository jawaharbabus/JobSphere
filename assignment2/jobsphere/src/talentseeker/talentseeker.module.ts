import { Module } from '@nestjs/common';
import { TalentSeekerController } from './talentseeker.controller';
import { TalentSeekerService } from './talentseeker.service';

@Module({
  controllers: [TalentSeekerController],
  providers: [TalentSeekerService],
})
export class TalentSeekerModule {}
