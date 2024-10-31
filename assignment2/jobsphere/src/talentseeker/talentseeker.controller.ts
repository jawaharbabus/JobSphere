import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TalentSeekerService } from './talentseeker.service';
import { Talent, TalentSeeker } from './data';

@Controller('api/talentseeker')
export class TalentSeekerController {
  constructor(private readonly talentSeekerService: TalentSeekerService) {}

  @Post('register')
  addTalentSeeker(@Body() seeker: TalentSeeker) {
    return this.talentSeekerService.addTalentSeeker(seeker);
  }

  @Post('post')
  postTalent(@Body() talent: Talent) {
    return this.talentSeekerService.postTalent(talent);
  }

  @Get('talents')
  getAllTalents() {
    return this.talentSeekerService.getAllTalents();
  }

  @Get('talents/:id')
  getTalent(@Param('id') id: number) {
    return this.talentSeekerService.getTalent(id);
  }
}
