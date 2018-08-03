import { User } from '../user';
import { Group, TeamMember } from '../group';

export interface PostTrialData {
  user: User;
  group: Group;
  otherTeamMembers: TeamMember[];
}
