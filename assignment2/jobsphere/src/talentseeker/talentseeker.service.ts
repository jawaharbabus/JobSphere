import { Injectable } from '@nestjs/common';
import { Talent, TalentSeeker } from './data'; 
import { talents, talentSeekers } from './data';

@Injectable()
export class TalentSeekerService {
  private talents = talents; // Reference to data.ts array
  private talentSeekers = talentSeekers;

  addTalentSeeker(seeker: TalentSeeker): TalentSeeker {
    seeker.id = this.talentSeekers.length + 1;
    this.talentSeekers.push(seeker);
    return seeker;
  }

  postTalent(talent: Talent): Talent {
    talent.id = this.talents.length + 1;
    talent.postedDate = new Date();
    this.talents.push(talent);
    return talent;
  }

  getAllTalents(): Talent[] {
    return this.talents;
  }

  getTalent(id: number): Talent | undefined {
    return this.talents.find((talent) => talent.id === id);
  }
}
