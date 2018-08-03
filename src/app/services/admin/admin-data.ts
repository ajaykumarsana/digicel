import { User } from '../user';
import { Group, TeamMember } from '../group';
import { AutoAttendant } from '../auto-attendant';
import { HuntGroupTable } from '../hunt-group';

export interface AdminData {
  user: User;
  group: Group;
  otherTeamMembers: TeamMember[];
  autoAttendant: AutoAttendant;
  huntGroupTable: HuntGroupTable;
}
